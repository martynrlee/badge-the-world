# Badge the World splash page

## Development
-----

### Installation

`npm start`

### Setting up data source

This project relies on google spreadsheets as a data source. In order to get
data from a private spreadsheet you have to set some things up.

In config.json:

  - "GEMAIL": "<replace>@developer.gserviceaccount.com",
  - "SHEETID": "<replace with google sheet id>",
  - "WORKSHEETID": "<replace with worksheet id>

  This project requires a google developer account and a PEM generated from
  a private key that google gives you when you create a dev account.
  The pem must be stored at ./btw.pem

### Run the server

`node app`