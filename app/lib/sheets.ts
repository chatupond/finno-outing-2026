import { google } from "googleapis"

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  })
}

export async function appendAttendee(
  name: string,
  email: string,
  team: string,
  imageUrl: string
) {
  const sheets = google.sheets({ version: "v4", auth: getAuth() })
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Attendees!A:E",
    valueInputOption: "RAW",
    requestBody: {
      values: [[new Date().toLocaleString("sv-SE", { timeZone: "Asia/Bangkok" }).replace("T", " "), name, email, team, imageUrl]],
    },
  })
}

export type Attendee = {
  timestamp: string
  name: string
  email: string
  team: string
  imageUrl: string
}

export async function getAttendees(): Promise<Attendee[]> {
  try {
    const sheets = google.sheets({ version: "v4", auth: getAuth() })
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Attendees!A:E",
    })
    const rows = response.data.values ?? []
    return rows
      .filter((row) => row.length >= 3 && row[2]?.includes("@"))
      .map((row) => ({
        timestamp: row[0] ?? "",
        name: row[1] ?? "",
        email: row[2] ?? "",
        team: row[3] ?? "",
        imageUrl: (row[4] ?? "").trim(),
      }))
  } catch {
    return []
  }
}

export async function checkExistingRegistration(email: string): Promise<boolean> {
  const attendees = await getAttendees()
  return attendees.some((a) => a.email === email)
}

export async function removeAttendee(email: string): Promise<boolean> {
  const sheets = google.sheets({ version: "v4", auth: getAuth() })

  // Get raw rows to find the exact row index (including header)
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Attendees!A:E",
  })
  const rows = response.data.values ?? []
  const rowIndex = rows.findIndex((row) => row[2] === email)
  if (rowIndex === -1) return false

  // Look up the numeric sheetId for the "Attendees" tab
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
  })
  const sheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === "Attendees"
  )
  const sheetId = sheet?.properties?.sheetId ?? 0

  // Delete the row
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    requestBody: {
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: rowIndex,
              endIndex: rowIndex + 1,
            },
          },
        },
      ],
    },
  })

  return true
}
