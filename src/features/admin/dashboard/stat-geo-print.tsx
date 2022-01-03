import React from "react";
import { Dialog, DialogContent, Button } from "@material-ui/core";
import { Crop, StatCropPerBarangayDto } from "../+models/dashboard-statistic";

import {
  Document,
  Page,
  StyleSheet as ReactPdfStyleSheet,
  View,
  Text,
  PDFViewer,
} from "@react-pdf/renderer";

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
    marginBottom: 20,
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
});

type DocumentToPrintProps = {
  statData: StatCropPerBarangayDto[];
};

type ReportData = {
  barangay?: string;
  id: string;
} & Crop;

const DocumentToPrint = ({ statData }: DocumentToPrintProps) => {
  const tableData = React.useMemo(() => {
    const groomedData: ReportData[] = statData.reduce(
      (prev: ReportData[], curr) => {
        const crops: ReportData[] = curr.crops.map((crop, ind) => ({
          barangay: ind === 0 ? curr.barangay : "",
          id: `${curr.barangayId}${ind}`,
          ...crop,
        }));

        prev = [...prev, ...crops];

        return prev;
      },
      []
    );

    return groomedData;
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <Text style={styles.header} fixed>
          Crops per Barangay
        </Text>
        <View>
          <View style={styles.row}>
            <Text style={[styles.cell, { flex: 2 }]}>Barangay</Text>
            <Text style={styles.cell}>Crop</Text>
            <Text style={[styles.cell, { textAlign: "right" }]}>Count</Text>
          </View>
          {statData.map((data, ind) => {
            return (
              <View key={`${data.barangayId}_${ind}`} style={styles.row}>
                <Text style={[styles.cell, { flex: 2 }]}>{`${ind + 1}. ${
                  data.barangay
                }`}</Text>
                <View style={{ display: "flex", flex: 2 }}>
                  {data.crops.map((crop) => (
                    <View
                      key={`${data.barangayId}_${ind}_${crop.crop}`}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={styles.cell}>{crop.crop}</Text>
                      <Text
                        style={[styles.cell, { textAlign: "right" }]}
                      >{`${crop.count} (${crop.percentage}%)`}</Text>
                    </View>
                  ))}
                </View>
              </View>
            );
          })}
        </View>
      </Page>
    </Document>
  );
};

type StatGeoPrintProps = {
  statData: StatCropPerBarangayDto[];
  isOpen: boolean;
  onClose: () => void;
};

const StatGeoPrint = ({ statData, isOpen, onClose }: StatGeoPrintProps) => {
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
            <DocumentToPrint statData={statData} />
          </PDFViewer>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StatGeoPrint;
