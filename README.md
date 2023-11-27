# Gmail Invoice Processing Script

## Description

This Google Apps Script automatically searches for Gmail messages containing specific terms (e.g., 'invoice'), retrieves these messages, and saves their attachments (excluding image files) into organized folders in Google Drive. It is particularly useful for managing invoice documents received via email.

## Features

- **Customizable Search Terms:** Specify search terms to filter relevant Gmail messages.
- **Date Range Filtering:** Searches emails within a specified date range.
- **Attachment Saving:** Saves non-image attachments to Google Drive.
- **Organized Folder Structure:** Creates a year/month folder structure in Google Drive for storing attachments.
- **Cache for Efficiency:** Utilizes caching for folder retrieval to enhance performance.

## Setup

1. **Google Cloud Console:**
   - Ensure you have access to Google Cloud Console and Google Apps Script.
   - No special APIs are needed beyond the default services.

2. **Google Apps Script:**
   - Go to [Google Apps Script](https://script.google.com/) and create a new project.
   - Copy the provided script into the script editor.

3. **Customize Search Terms and Dates:**
   - Modify the `searchTerms`, `startDate`, and `endDate` variables in the `main` function as needed.

4. **Run the Script:**
   - Execute the `main` function within the Google Apps Script environment.
   - Grant the necessary permissions when prompted.

## Usage

After setting up the script:

- The script will look for emails within the specified date range containing any of the provided search terms.
- It filters out image attachments and saves other attachments to the designated Google Drive folder.
- The Drive folder structure is organized by year and month based on the email's date.

## Script Functions

- **`buildSearchQuery`**: Constructs a Gmail search query using the provided search terms and date range.
- **`findMessages`**: Retrieves Gmail messages that match the search query.
- **`saveAttachments`**: Saves attachments from each message to a specific Drive folder, excluding images.
- **`getOrCreateGdriveFolder`**: Retrieves or creates folders in Google Drive, optimized with caching.
- **`main`**: Main function that orchestrates the execution of the script.

## Limitations

- The script's execution time is subject to Google Apps Script's quotas and limitations.
- Currently, the script does not distinguish between different file types beyond filtering out image files.

## Contributing and Credits

- Feel free to fork this project, make changes, and submit pull requests. Any contributions for additional features or optimizations are welcome.
- If you fork or use this project, please provide appropriate credit by linking back to the original source.

## License

This script is provided "as is" without warranty of any kind, either expressed or implied.
