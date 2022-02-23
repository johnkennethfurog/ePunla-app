import React from "react";
import { Dialog, DialogContent, Button } from "@material-ui/core";
import {
  Crop,
  FarmerPerBarangayDto,
  StatCropPerBarangayDto,
} from "../+models/dashboard-statistic";

import {
  Document,
  Page,
  StyleSheet as ReactPdfStyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectName } from "../+state/adminSelectors";

// Create styles
const styles = ReactPdfStyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  cell: {
    fontSize: 12,
    flex: 1,
    textAlign: "left",
    fontFamily: "Times-Roman",
  },
  header: {
    fontSize: 12,
    textAlign: "center",
    color: "black",
  },
  subheader: {
    fontSize: 10,
    marginBottom: 3,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
  },
  printedDate: {
    position: "absolute",
    fontSize: 8,
    bottom: 30,
    left: 0,
    right: 10,
    textAlign: "right",
    color: "grey",
  },
  printedBy: {
    position: "absolute",
    fontSize: 8,
    bottom: 20,
    left: 0,
    right: 10,
    textAlign: "right",
    color: "grey",
  },
});

type DocumentToPrintProps = {
  data: FarmerPerBarangayDto[];
  name: string;
};

const DocumentToPrint = ({ data, name }: DocumentToPrintProps) => {
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          Farmers per Barangay
        </Text>
        <Text style={styles.subheader} fixed>
          {`as of ${moment().format("MM-DD-YYYY")}`}
        </Text>
        <View>
          <View style={styles.row}>
            <Text style={[styles.cell]}>Barangay</Text>
            <Text style={styles.cell}>Name</Text>
            <Text style={[styles.cell, { flex: 1 }]}>Address</Text>
            <Text style={styles.cell}>Mobile Number</Text>
            <Text style={styles.cell}>Member Since</Text>
          </View>
          {data.map((data, ind) => {
            return (
              <View key={`${data.barangayId}_${ind}`} style={styles.row}>
                <Text style={[styles.cell, { flex: 1 }]}>{`${ind + 1}. ${
                  data.barangay
                }`}</Text>
                <View style={{ display: "flex", flex: 4 }}>
                  {data.farmers.map((frmr) => (
                    <View
                      key={`${data.barangayId}_${ind}_${frmr.farmerId}`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={[styles.cell]}
                      >{`${frmr.firstName} ${frmr.lastName}`}</Text>
                      <Text style={[styles.cell, { flex: 1 }]}>
                        {frmr.streetAddress ?? "-"}
                      </Text>
                      <Text
                        style={styles.cell}
                      >{`+63${frmr.mobileNumber}`}</Text>
                      <Text style={styles.cell}>{`${
                        frmr.registrationDate
                          ? moment(frmr.registrationDate).format("MM-DD-yyyy")
                          : "-"
                      }`}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
        <Text
          style={styles.printedDate}
          render={() => `Print date : ${moment().format("MM-d-yyy HH:mm")}`}
          fixed
        />
        <Text
          style={styles.printedBy}
          render={() => `Print by : ${name}`}
          fixed
        />
      </Page>
    </Document>
  );
};

type StatFarmerCountPrintProps = {
  statData: FarmerPerBarangayDto[];
  isOpen: boolean;
  onClose: () => void;
};

const StatFarmerCountPrint = ({
  statData,
  isOpen,
  onClose,
}: StatFarmerCountPrintProps) => {
  const name = useSelector(selectName);

  return (
    <Dialog
      style={{ position: "relative" }}
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
    >
      <Button
        color="primary"
        style={{ position: "absolute", right: 10, top: 10, width: 5 }}
        onClick={onClose}
      >
        Close
      </Button>

      <DialogContent>
        <div style={{ height: "90vh", width: "100%", marginTop: 40 }}>
          <PDFViewer style={{ width: "100%", height: "100%" }}>
            <DocumentToPrint name={name} data={statData} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatFarmerCountPrint;
