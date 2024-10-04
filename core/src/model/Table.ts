type RecordSet = Array<{ [key: string]: any }>;

export class Table {
  private recordSet: RecordSet;

  // Constructor to initialize the recordSet
  constructor(recordSet: RecordSet) {
    this.recordSet = recordSet;
  }

  // Method to print the table
  public printTable(): void {
    if (!this.recordSet || this.recordSet.length === 0) {
      console.log("No data available.");
      return;
    }

    // Get the keys from the first row to use as column headers
    const headers = Object.keys(this.recordSet[0]);

    // Print the headers
    console.log(headers.join(' | '));
    console.log('-'.repeat(headers.join(' | ').length));

    // Print each row
    this.recordSet.forEach(row => {
      const rowValues = headers.map(header => String(row[header] || ""));
      console.log(rowValues.join(' | '));
    });
  }
}