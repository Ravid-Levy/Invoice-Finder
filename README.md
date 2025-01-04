# Gmail Invoice Processing Script

This Google Apps Script automates the process of organizing invoice-related emails from Gmail into structured folders in Google Drive. By searching for specific terms within a defined date range, the script retrieves relevant emails, extracts their attachments (excluding images), and saves them into a hierarchical folder structure based on the year and month of the email's date. This streamlined approach simplifies invoice management, ensuring that all your financial documents are neatly organized and easily accessible.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [Script Functions](#script-functions)
- [Customization](#customization)
- [Limitations](#limitations)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Customizable Search Terms:** Define specific keywords (e.g., 'invoice', 'חשבונית') to filter relevant Gmail messages.
- **Date Range Filtering:** Specify start and end dates to narrow down the search to a particular timeframe.
- **Attachment Management:** Automatically saves non-image attachments from emails to Google Drive.
- **Organized Folder Structure:** Creates a hierarchical folder system in Google Drive organized by year and month based on the email's date.
- **Performance Optimization:** Utilizes caching for folder retrieval to enhance script efficiency.

## Prerequisites

- **Google Account:** Ensure you have a Google account with access to Gmail and Google Drive.
- **Google Apps Script Access:** Familiarity with Google Apps Script and access to the [Google Apps Script Editor](https://script.google.com/).
- **Permissions:** The script requires permissions to access Gmail and Google Drive.

## Setup

1. **Access Google Apps Script:**
   - Navigate to [Google Apps Script](https://script.google.com/) and create a new project.

2. **Copy the Script:**
   - Copy the provided script into the script editor.

3. **Configure Script Parameters:**
   - Modify the `searchTerms`, `startDate`, and `endDate` variables in the `main` function to suit your requirements.
     ```javascript
     function main() {
       var searchTerms = ['invoice', 'חשבונית'];
       var startDate = '2024/01/01';
       var endDate = '2024/01/04';
       organizeInvoices(searchTerms, startDate, endDate);
     }
     ```

4. **Authorize the Script:**
   - Click the **Run** button to execute the `main` function.
   - A prompt will appear requesting necessary permissions. Follow the instructions to grant access.

5. **Set Up Triggers (Optional):**
   - To automate the script execution, set up a trigger:
     - Go to **Edit > Current project's triggers**.
     - Click on **Add Trigger** and configure the desired frequency (e.g., daily, weekly).

## Usage

Once set up, the script performs the following actions:

1. **Search Emails:**
   - Searches Gmail for messages containing any of the specified `searchTerms` within the defined `startDate` and `endDate`.

2. **Retrieve Attachments:**
   - Extracts attachments from the filtered emails, excluding image files.

3. **Organize in Google Drive:**
   - Saves the extracted attachments into Google Drive.
   - Creates a folder structure based on the year and month of each email's date (e.g., `Invoices/2024/01`).

4. **Logging:**
   - Logs the number of processed messages and completion status for monitoring purposes.

## Script Functions

- ### `buildSearchQuery(terms, startDate, endDate)`
  Constructs a Gmail search query using the provided search terms and date range.

  **Parameters:**
  - `terms` (Array): Array of search keywords.
  - `startDate` (string): Start date in `YYYY/MM/DD` format.
  - `endDate` (string): End date in `YYYY/MM/DD` format.

  **Returns:**
  - `string`: The constructed search query.

- ### `findMessages(query)`
  Retrieves Gmail messages that match the constructed search query and contain attachments.

  **Parameters:**
  - `query` (string): The search query.

  **Returns:**
  - `Array`: Array of Gmail messages that match the query.

- ### `saveAttachments(driveLocation, message)`
  Saves non-image attachments from a Gmail message to a specified Google Drive folder.

  **Parameters:**
  - `driveLocation` (Folder): The Google Drive folder to save attachments in.
  - `message` (GmailMessage): The Gmail message containing attachments.

- ### `getOrCreateGdriveFolder(folderPath)`
  Retrieves an existing Google Drive folder or creates a new one if it doesn't exist, using a caching mechanism for efficiency.

  **Parameters:**
  - `folderPath` (string): The hierarchical path of the folder (e.g., `Invoices/2024/01`).

  **Returns:**
  - `Folder`: The Google Drive folder.

- ### `organizeInvoices(searchTerms, startDate, endDate)`
  Orchestrates the process of searching Gmail messages, retrieving attachments, and organizing them into Google Drive folders.

  **Parameters:**
  - `searchTerms` (Array): Array of search keywords.
  - `startDate` (string): Start date in `YYYY/MM/DD` format.
  - `endDate` (string): End date in `YYYY/MM/DD` format.

- ### `main()`
  The main function that initiates the invoice organization process with predefined search terms and date range.

## Customization

- **Search Terms:** Modify the `searchTerms` array to include keywords relevant to your invoices.
  ```javascript
  var searchTerms = ['invoice', 'חשבונית', 'receipt'];
