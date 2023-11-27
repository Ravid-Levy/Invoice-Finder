// Array of search terms
var searchTerms = ['invoice', 'חשבונית'];

/**
 * Builds a search query string from a list of terms.
 *
 * @param {Array} terms - Array of search terms.
 * @param {string} startDate - Start date in YYYY/MM/DD format.
 * @param {string} endDate - End date in YYYY/MM/DD format.
 * @return {string} The constructed search query.
 */
function buildSearchQuery(terms, startDate, endDate) {
  // Map each term into a search query part
  var queryParts = terms.map(term => `(${term})`);
  // Construct the date range part of the query
  var dateRangeQuery = ` after:${startDate} before:${endDate}`;
  // Combine all parts into a full query string
  return queryParts.join(' OR ') + dateRangeQuery;
}

/**
 * Finds and returns Gmail messages that match the given query.
 *
 * @param {string} query - The search query.
 * @return {Array} Array of Gmail messages that match the query.
 */
function findMessages(query) {
  var messages = [];
  var threads = GmailApp.search(query); // Search for threads that match the query
  threads.forEach(thread => {
    var msgs = thread.getMessages(); // Get all messages in a thread
    msgs.forEach(msg => {
      // Check if the message has attachments
      if (msg.getAttachments().length > 0) {
        messages.push(msg);
      }
    });
  });
  return messages;
}

/**
 * Saves attachments from a message to a specified drive location.
 *
 * @param {Folder} driveLocation - The Google Drive folder to save attachments in.
 * @param {GmailMessage} message - The Gmail message to process for attachments.
 */
function saveAttachments(driveLocation, message) {
  var attachments = message.getAttachments();
  attachments.forEach(attachment => {
    // Skip if the attachment is an image
    if (attachment.getContentType().indexOf("image/") === -1) {
      // Check if the file already exists in the folder
      var existingFiles = driveLocation.getFilesByName(attachment.getName());
      if (!existingFiles.hasNext()) {
        // Save the attachment to the drive location
        driveLocation.createFile(attachment).setName(attachment.getName());
      }
    }
  });
}

var folderCache = {}; // Cache for Google Drive folders to improve performance

/**
 * Gets an existing folder or creates a new one if it doesn't exist.
 *
 * @param {string} folderPath - The path of the folder.
 * @return {Folder} The Google Drive folder.
 */
function getOrCreateGdriveFolder(folderPath) {
  // Return from cache if already available
  if (folderCache[folderPath]) {
    return folderCache[folderPath];
  }

  var path = folderPath.split("/");
  var currentFolder = DriveApp.getRootFolder();
  path.forEach(folderName => {
    // Check if folder exists, else create it
    var folderIterator = currentFolder.getFoldersByName(folderName);
    currentFolder = folderIterator.hasNext() ? folderIterator.next() : currentFolder.createFolder(folderName);
  });

  folderCache[folderPath] = currentFolder; // Update cache
  return currentFolder;
}

function main() {
  Logger.clear();
  // Define date range outside the function
  var startDate = '2023/01/01';
  var endDate = '2023/11/28';
  // Build search query using the terms and date range
  var query = buildSearchQuery(searchTerms, startDate, endDate);
  var messages = findMessages(query); // Find messages that match the query
  Logger.log(`Found ${messages.length} messages for the query.`);

  messages.forEach(message => {
    var date = message.getDate();
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Months are 0-indexed
    var monthFolderName = `Invoices/${year}/${month}`;

    // Retrieve or create the folder for saving attachments
    var driveLocation = getOrCreateGdriveFolder(monthFolderName);
    saveAttachments(driveLocation, message); // Save attachments from the message
  });

  Logger.log("Processing complete.");
}

main(); // Run the main function
