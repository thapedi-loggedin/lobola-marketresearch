# Google Sheets – Research questionnaire setup

Follow these steps in order. Reply "done" after each step so we can continue.

---

## Step 1: Sheet headers + Apps Script code

### 1.1 – Add header row in your Google Sheet

In the **first row** of the sheet where you want responses to go, add these column headers (one per cell, in this order):

| A | B | C | D | E | F | G | H | I | J | K | L | M | N |
|---||---||---||---||---||---||---||---||---||---||---||---|---|
| session_id | purpose | timing | challenge | engagement | pricing | full_name | email | phone | preferred_language | consent | submitted_at | source | submitted |

- **session_id** identifies one questionnaire session; the script updates the same row on each "Next" and on final submit so all answers stay in one row.
- **purpose** stores multiple choices as comma-separated text (e.g. "Lobola / customary process, Prenuptial agreement").
- **submitted** is "Yes" when the user completed the form, "No" when they only progressed through steps (save-on-next).
- Leave row 2 and below empty (or existing rows as-is); the script will append or update rows.

### 1.2 – Get your Sheet ID

- Open your Google Sheet in the browser.
- Look at the URL: `https://docs.google.com/spreadsheets/d/1IMW7UsSRU-oVjTg_H7Se10aiFxIh9MPUVh7Ouozph_o/edit`
- The part between `/d/` and `/edit` is your **Sheet ID**. Copy it (you’ll paste it into the script below).

### 1.3 – Paste this script into your Apps Script project

1. In the Sheet: **Extensions** → **Apps Script** (or open the Apps Script project you already created).
2. Replace the default `function myFunction() { }` with the code below.
3. In the code, replace these two placeholders:
   - **`YOUR_SHEET_ID`** → paste **only** the Sheet ID from 1.2 (e.g. `1IMW7UsSRU-oVjTg_H7Se10aiFxIh9MPUVh7Ouozph_o`). **Do not use the full URL** — `openById()` expects only the ID.
   - **`Sheet1`** → replace with your **tab/sheet name** (the name of the tab at the bottom where you added the headers). If your tab has a different name (e.g. "Responses"), use that.

4. **Share the spreadsheet** with the same Google account that deploys the Web app (Deploy → Manage deployments; the app runs as that account). Give that account **Editor** access so the script can append rows. Without this, `openById` can fail with "Unexpected error... openById".

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById('YOUR_SHEET_ID'); // Only the ID, not the full URL
    var sheet = ss.getSheetByName('Sheet1'); // Change to your tab name if different

    var purposeStr = Array.isArray(data.purpose) ? data.purpose.join(', ') : (data.purpose || '');
    var submittedStr = data.submitted === true ? 'Yes' : 'No';

    var rowValues = [
      data.sessionId || '',
      purposeStr,
      data.timing || '',
      data.challenge || '',
      data.engagement || '',
      data.pricing || '',
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.preferredLanguage || '',
      data.consent === true ? 'Yes' : 'No',
      data.submittedAt || '',
      data.source || '',
      submittedStr
    ];

    if (data.sessionId) {
      var lastRow = sheet.getLastRow();
      var sessionCol = 1;
      var foundRow = null;
      if (lastRow >= 2) {
        var colA = sheet.getRange(2, sessionCol, lastRow, sessionCol).getValues();
        for (var r = 0; r < colA.length; r++) {
          if (String(colA[r][0]) === String(data.sessionId)) {
            foundRow = r + 2;
            break;
          }
        }
      }
      if (foundRow !== null) {
        sheet.getRange(foundRow, 1, foundRow, rowValues.length).setValues([rowValues]);
      } else {
        sheet.appendRow(rowValues);
      }
    } else {
      sheet.appendRow(rowValues);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

5. **Save** the project (Ctrl+S or the disk icon).
6. Run **doPost** once from the editor (Run → doPost) just to trigger authorization if needed; it may fail with "cannot read postData" when run from the editor—that’s OK. The important part is that Google has authorized the script.
7. After changing the script, deploy a **New version** of your Web app (see Step 2.3) so the live URL runs the upsert logic (one row per session, updated on each "Next" and on submit).

When you’ve finished **1.1**, **1.2**, and **1.3**, reply **"done"** and we’ll go to the next step (deploy the script and get the Web app URL).

---

## Step 2: Deploy the script and add the URL to your app

### 2.1 – Deploy as a Web app

1. In **Apps Script**: click **Deploy** → **New deployment**.
2. Click the **gear icon** next to “Select type” and choose **Web app**.
3. Set:
   - **Description:** e.g. `Research form`
   - **Execute as:** **Me** (your Google account)
   - **Who has access:** **Anyone** (so your Next.js server can call it)
4. Click **Deploy**. If asked, **Authorize** the app (choose your Google account and allow access).
5. Copy the **Web app URL** (e.g. `https://script.google.com/macros/s/AKfy.../exec`). You’ll add it to `.env.local` in the next step.

### 2.2 – Add the URL to your project

1. Open **`.env.local`** in the project root (create it if it doesn’t exist).
2. Add this line (paste your actual Web app URL in place of the placeholder):

```env
RESEARCH_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

- Use **either** variable name: `RESEARCH_SHEETS_WEB_APP_URL` or `GOOGLE_SHEETS_WEB_APP_URL` (exact spelling).
- No spaces around `=`, no spaces before or after the URL, no quotes around the URL.
- Use the **Web app URL** (ends with `/exec`), not the “library” URL.
- File must be **`.env.local`** in the **project root** (same folder as `package.json`).
- If you open the Web app URL in a browser you may see “Script function not found: doGet”—that’s normal; the app sends POST requests and uses `doPost`, not GET.

3. Save the file.
4. Restart the Next.js dev server (`npm run dev`) so it picks up the new variable.

When this is done, reply **"done"** and we’ll confirm everything is wired up.

### 2.3 – After you change the script (important)

When you edit the script (e.g. switch from `openById` to `getActiveSpreadsheet()`), the **live Web app does not update automatically**. You must deploy a **new version**:

1. In **Apps Script**: **Deploy** → **Manage deployments**.
2. Click the **pencil (Edit)** on your existing Web app deployment.
3. Under **Version**, open the dropdown and choose **New version** (so it uses the latest code).
4. Optionally add a description (e.g. “Use getActiveSpreadsheet”).
5. Click **Deploy**. The Web app URL stays the same; it now runs the new code.

If you skip this, the URL will still run the old code (e.g. with `openById`), and you may see errors like “openById” or “JavaScript runtime exited unexpectedly”.

---

## Step 3: Verify

**Important:** If you added `RESEARCH_SHEETS_WEB_APP_URL` after starting the dev server, **restart it** (`Ctrl+C` then `npm run dev`) so the env var is loaded.

### Option A – Quick API test

From the project root, with the dev server running:

```bash
node scripts/test-sheets-api.mjs
```

- You should see `Status: 200` and `Response: {"success":true}`.
- If you see `503` and "Google Sheets integration not configured", restart the dev server and try again.
- Then open your **Google Sheet** and confirm a new row was added (test data: "Test User", test@example.com, etc.).

### Option B – Full form in the browser

1. Open the site and go to the **How it works** section.
2. Click the **Login** step (Step 3) to open the research questionnaire.
3. As you click **Next** through the steps, the same row in the sheet is updated (save-on-next). When you submit, that row is updated again with `submitted` = Yes.
4. Check your **Google Sheet** — one row per session, with `session_id` in column A and `submitted` (Yes/No) in the last column.
5. **Supabase** (if configured) and **localStorage** receive the full submission on final submit only; the sheet receives progress on each Next and the final submit.
