// connect-with-account-name-and-key.js
import { BlobServiceClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const accountName = 'isistorage'
const accountKey = '7zqTvZDLx1Ur0ij93sCavj2UUC0xL7lOtYdoX8FxgDwKaNsiPDdBgIv9MkUfqiUQnqdSgwZJOWpt+AStUOLoPg=='
const containerName = 'documetos';

if (!accountName) throw Error('Azure Storage accountName not found');
if (!accountKey) throw Error('Azure Storage accountKey not found');

const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  sharedKeyCredential
);
// create container client
const containerClient = blobServiceClient.getContainerClient(containerName);


// Download files from AZURE

/**

Downloads a file from Azure Blob Storage
@param {string} blobName Name of the blob to download
@param {string} localPath Path where the file will be downloaded
@returns {Promise} Returns a Promise that resolves when the file is downloaded successfully, and rejects if there is any error during the download process.
*/
async function downloadDocFromAzure(blobName, localPath) {
  return new Promise(async (resolve, reject) => {
    // create blob client
    const blobClient = await containerClient.getBlockBlobClient(blobName);

    // download file
    await blobClient.downloadToFile(`${localPath}/${blobName}`)
      .then(t => {
        console.log(`${blobName} downloaded`);
        resolve()
      })
      .catch((ex) => reject(ex.message))



  });
}

/**
Uploads a file to Azure Blob Storage
@param {string} blobName Name of the blob to be created
@param {string} localFileWithPath Path of the local file to be uploaded
@returns {Promise<string>} URL of the uploaded file
*/
async function uploadFileToAzure(blobName, localFileWithPath) {
  return new Promise(async (resolve, reject) => {
    try {
      // create blob client from container client
      const blockBlobClient = await containerClient.getBlockBlobClient(blobName)

      // upload file to blob storage

      await blockBlobClient.uploadFile(
        localFileWithPath, {
        blobHTTPHeaders: {
          blobContentType: "application/pdf",
        }
      })

      const url = await blockBlobClient.url
      console.log(`${blobName} succeeded`);
      resolve(url)
    } catch (error) {
      reject(error)
    }

  })



}


/**
Check if a blob exists in a container and returns the blob URL
@param {string} blobName Name of the blob to check
@returns {Object} Object with a boolean indicating if the blob exists and the blob URL
*/
async function blobExists(blobName) {
  const blobClient = containerClient.getBlobClient(blobName);

  // Verificamos si el blob existe
  const existe = await blobClient.exists();
  let url = ''
  if (existe) {
    url = blobClient.url;
    console.log(existe);

  }

  // Devolvemos un booleano que indica si el blob existe o no
  return { existe, url };
}




export { downloadDocFromAzure, uploadFileToAzure, blobExists }