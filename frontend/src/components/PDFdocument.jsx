import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from '@mui/material';

// Create styles
const styles = StyleSheet.create({
    page: { flexDirection: "column", padding: 25 },
    table: {
      fontSize: 10,
      width: 550,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignContent: "stretch",
      flexWrap: "nowrap",
      alignItems: "stretch"
    },
    row: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignContent: "stretch",
      flexWrap: "nowrap",
      alignItems: "stretch",
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: 35
    },
    cell: {
      borderColor: "#cc0000",
      borderStyle: "solid",
      borderWidth: 2,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: "auto",
      alignSelf: "stretch"
    },
    header: {
      backgroundColor: "#eee"
    },
    headerText: {
      fontSize: 11,
      fontWeight: 1200,
      color: "#1a245c",
      margin: 8
    },
    tableText: {
      margin: 10,
      fontSize: 10,
      color: 'neutralDark'
    }
  });

  const MyDoc = ({medicalFile}) => (
    <Document>
        <Page style={styles.page} size="A4" wrap>
            <View style={styles.table}>
                <View style={[styles.row, styles.header]}>
                    <Text style={[styles.headerText, styles.cell]}>Column 1 Header</Text>
                    <Text style={[styles.headerText, styles.cell]}>Column 2 Header</Text>
                    <Text style={[styles.headerText, styles.cell]}>Column 3 Header</Text>
                    <Text style={[styles.headerText, styles.cell]}>Column 4 Header</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cell]}>Column 1 Row 1</Text>
                    <Text style={[styles.cell]}>Column 2 Row 1</Text>
                    <Text style={[styles.cell]}>Column 3 Row 1</Text>
                    <Text style={[styles.cell]}>Column 4 Row 1</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cell]}>Column 1 Row 2</Text>
                    <Text style={[styles.cell]}>Column 2 Row 2</Text>
                    <Text style={[styles.cell]}>Column 3 Row 2</Text>
                    <Text style={[styles.cell]}>Column 4 Row 2</Text>
                </View>
                <View style={[styles.row]}>
                    <Text style={[styles.cell]}>Column 1 Row 3</Text>
                    <Text style={[styles.cell]}>Column 2 Row 3</Text>
                    <Text style={[styles.cell]}>Column 3 Row 3</Text>
                    <Text style={[styles.cell]}>Column 4 Row 3</Text>
                </View>
            </View>
        </Page>
  </Document>
)

function PDFdocument({medicalFile}) {
  return (
    <div>
    <PDFDownloadLink document={<MyDoc medicalFile={medicalFile}/>} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : (
        <Button
        variant='contained'
        sx={{backgroundColor: 'CadetBlue', '&:hover': {backgroundColor:'#4c7e80'},
        '@media (min-width: 800px)': { position: 'absolute', bottom: '8px', right: '150px'}}}>
            יצא לקובץ PDF
        </Button>
        )
      }
    </PDFDownloadLink>
  </div>
  )
}

export default PDFdocument
