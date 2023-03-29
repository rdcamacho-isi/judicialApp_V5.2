import { createRequire } from "module";
// De esta manera se puede utilizar import y require en un mpdulo ES6
const require = createRequire(import.meta.url);
const { PDFNet } = require('@pdftron/pdfnet-node');

// const API_KEY = 'demo:1674671976287:7d5eccd50300000000ecd09b28623b66e1e45740dc387e0b377588c301'


/**

Lee el contenido de texto de un archivo PDF utilizando la biblioteca PDFTron.
@param {string} docName Nombre del archivo PDF a leer.
@param {string} apiKeyPdf Clave de API para utilizar el servicio de PDFTron.
@returns {string} El contenido de texto del archivo PDF.
*/
async function pdfTronReader(docName, apiKeyPdf) {
  let textReaded = ''
  const main = async () => {
    // eslint-disable-next-line no-unused-vars
    let ret = 0;
    // Relative path to the folder containing test files.
    const inputPath = './controllers/doc//';
    const inputFilename = docName; // addimage.pdf, newsletter.pdf
    try {
      await PDFNet.startDeallocateStack();
      const doc = await PDFNet.PDFDoc.createFromFilePath(inputPath + inputFilename);
      doc.initSecurityHandler();

      const page = await doc.getPage(1);

      if (page.id === '0') {
        console.log('Page not found.');
        return 1;
      }

      const txt = await PDFNet.TextExtractor.create();
      txt.begin(page);

      let text;
      // Get all text on the page in a single string.
      // Words will be separated with space or new line characters.
      text = await txt.getAsText();
      if (text) {
        textReaded = text
        console.log('Lectura Exitosa');
      } else {
        console.log('No se pudo leer el Doc');
      }
      await PDFNet.endDeallocateStack();
    } catch (err) {
      console.log(err);
      console.log(err.stack);
      ret = 1;
    }
  };
  await PDFNet.runWithCleanup(main, apiKeyPdf).catch(function (error) {
    console.log('Error: ' + JSON.stringify(error));
  }).then(async function () {
    // await PDFNet.shutdown();

  });
  return textReaded
}
/**

Realiza la lectura de texto OCR de un archivo PDF utilizando PDFTron SDK y la tecnología OCR. En caso de que pueda leerlo se guardara el archivo con el mismo nombre y procesado.
@param {string} docName Nombre del archivo PDF a leer.
@param {string} apiKeyPdf Clave de API para utilizar el servicio de PDFTron.
@returns {string} El contenido de texto del archivo PDF.
*/
async function ocrReader(docName, apiKeyPdf) {
  const main = async () => {
    PDFNet.addResourceSearchPath('./controllers/Lib');
    const useIRIS = await PDFNet.OCRModule.isIRISModuleAvailable();
    if (!(await PDFNet.OCRModule.isModuleAvailable())) {
      console.log('\nUnable to run OCRTest: PDFTron SDK OCR module not available.');
      console.log('---------------------------------------------------------------');
      console.log('The OCR module is an optional add-on, available for download');
      console.log('at http://www.pdftron.com/. If you have already downloaded this');
      console.log('module, ensure that the SDK is able to find the required files');
      console.log('using the PDFNet.addResourceSearchPath() function.\n');
      return;
    } else {
    }

    const inputFilename = docName; // addimage.pdf, newsletter.pdf
    const outputFileName = docName

    // Relative path to the folder containing test files.
    const input_path = './controllers/doc//';
    const output_path = './controllers/doc//';
    try {
      // A) Open the .pdf document
      const doc = await PDFNet.PDFDoc.createFromFilePath(input_path + inputFilename);
      doc.initSecurityHandler();

      // B) Setup options with a single language and an ignore zone
      const opts = new PDFNet.OCRModule.OCROptions();
      if (useIRIS) opts.setOCREngine('iris');
      opts.addLang('spa');
      const ignore_zones = [];
      ignore_zones.push(new PDFNet.Rect(424, 163, 493, 730));
      opts.addIgnoreZonesForPage(ignore_zones, 1);

      // C) Run OCR on the .pdf with options
      await PDFNet.OCRModule.processPDF(doc, opts);

      // D) check the result
      await doc.save(output_path + outputFileName, 0);

    } catch (err) {
      console.log('Error en OCR');
      console.log(err);
    }

  };
  await PDFNet.runWithCleanup(main, apiKeyPdf)
    .catch(function (error) {
      console.log('Error: ' + JSON.stringify(error));
    }).then(async function () { });

}
/**

Desbloquea y descifra un archivo PDF protegido con contraseña.

@param {string} docName Nombre del archivo PDF a leer.
@param {string} apiKeyPdf Clave de API para utilizar el servicio de PDFTron.
@returns {string} El contenido de texto del archivo PDF.
*/
async function descrypPdf(docName, apiKeyPdf) {
  console.log('Desbloqueando el documento');
  let d = 0
  // Lee con PDFreader
  function lector() {
    return new Promise((resolve, reject) => {
      let text = ''
      new PdfReader({ password: "test" }).parseFileItems(
        './controllers/doc/' + docName,
        function (err, item) {
          if (err) {
            console.log('err');
            console.log(err.parserError);
            console.log('err');
            reject(err.parserError)

          }
          else if (!item) {
            if (d == 0) {
              console.log('undefine');
              console.log(item);

            }
            resolve()
          }
          else if (item.text) {
            text = item.text
            d++
          }
        }

      )
      setTimeout(() => {
        if (!text) {
          reject('no se pudo leer')
        }
      }, 2000);

    })

  }
  const main = async () => {
    const doc = await PDFNet.PDFDoc.createFromFilePath('./controllers/doc/' + docName);
    if (!(await doc.initStdSecurityHandlerUString("test"))) {
      console.log(
        "Document authentication error.../nThe password is not valid."
      );
      await doc.removeSecurity();
      await doc.save('./controllers/doc/' + docName, 0);

    } else {
      console.log(
        "The password is correct! Document can now be used for reading and editing"
      );
    }
  };

  try {
    await lector()
  } catch (error) {
    if (error == 'Error: unsupported encryption algorithm') {
      await PDFNet.runWithCleanup(main, apiKeyPdf)
        .catch(function (error) {
          console.log("Error: " + JSON.stringify(error));
        })
        .then(function () {


        });
    } else {
      console.log('Error al desbloquear el documento');
      throw error
    }
  }
}

export { pdfTronReader, ocrReader, descrypPdf }