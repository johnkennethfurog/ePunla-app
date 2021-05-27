import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  InputAdornment,
} from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import GoogleMapReact, { ClickEventValue } from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoading from "../../../components/button-loading/button-loading";
import AppDatePicker from "../../../components/date-picker/date-picker";
import { SimpleDropDown } from "../../../components/select/selects";
import useInput from "../../../hooks/useInput";
import { LookupItem } from "../../../models/lookup-item";
import { Farm } from "../farmer-models/farm";
import { selectIsSaving } from "../farmerSelectors";
import { fetchBarangays, selectBarangay } from "../../../app/commonSlice";
import { Coordinates } from "../../../models/coordinates";
import LocationMarker from "./farm-location-marker";
import { addValidationError, saveFarm } from "../farmerActions";
import ErrorAlert from "../../../components/error-alert/error-alert";

type FarmSaveModalProps = {
  farm?: Farm;
  isOpen: boolean;
  onClose: () => void;
};

const tanauan_coords: Coordinates = {
  lng: 121.09959078753087,
  lat: 14.098898609585907,
};

const FarmSaveModal = (props: FarmSaveModalProps) => {
  const { isOpen, onClose, farm } = props;

  const dispatch = useDispatch();

  const isSaving = useSelector(selectIsSaving);
  const barangays = useSelector(selectBarangay);
  const [isNew, setIsNew] = useState(true);

  const [farmName, bindFarmName, setFarmName] = useInput("");
  const [address, bindAddress, setAddress] = useInput("");
  const [areaSize, bindAreaSize, setAreaSize] = useInput("");
  const [areaId, bindAreaId, setAreaId] = useInput<string | number>("");
  const [barangayId, bindBarangayId, setBarangayId] =
    useInput<string | number>("");

  const [coordinates, setCoordinates] = useState<Coordinates>(null);
  const [barangayLookup, setBarangayLookup] = useState<LookupItem[]>(() => []);
  const [areaLookup, setAreaLookup] = useState<LookupItem[]>(() => []);

  useEffect(() => {
    if (!isOpen) {
      setAreaLookup([]);
      setBarangayLookup([]);

      return;
    }

    setIsNew(!!farm);

    setFarmName(farm?.name || "");
    setAddress(farm?.streetAddress || "");
    setAreaSize(farm?.areaSize.toString() || "");
    setBarangayId(farm?.barangayId || "");
    setAreaId(farm?.barangayAreaId || "");
    setCoordinates(
      !!farm?.lng && !!farm.lat ? { lng: farm.lng, lat: farm.lat } : null
    );

    dispatch(fetchBarangays());
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const lookup = barangays.map((x) => {
      return {
        value: x.barangay,
        id: x.barangayId,
      } as LookupItem;
    });
    setBarangayLookup(lookup);
  }, [barangays, isOpen]);

  useEffect(() => {
    if (!isOpen || !barangayId || barangays.length < 1) {
      return;
    }

    const brgy = barangays.find((x) => x.barangayId === barangayId);
    const lookup = brgy.areas.map((x) => {
      return {
        value: x.area,
        id: x.barangayAreaId,
      } as LookupItem;
    });
    console.log("y");
    setAreaLookup(lookup);
  }, [barangayId, isOpen, barangays]);

  const closeFarmSaveModal = () => {};

  const onSave = () => {
    if (!farmName) {
      dispatch(addValidationError("Farm Name is required"));
      return;
    }

    if (!barangayId) {
      dispatch(addValidationError("Barangay is required"));
      return;
    }

    if (!areaId) {
      dispatch(addValidationError("Barangay Area is required"));
      return;
    }

    if (!address) {
      dispatch(addValidationError("Address is required"));
      return;
    }

    if (!areaSize) {
      dispatch(addValidationError("Farm size is required"));
      return;
    }

    if (!coordinates) {
      dispatch(addValidationError("Pleas point you farm location in the map"));
      return;
    }

    dispatch(
      saveFarm(
        {
          name: farmName,
          barangayAreaId: +areaId,
          barangayId: +barangayId,
          size: +areaSize,
          farmId: farm?.farmId,
          streetAddress: address,
          lng: coordinates.lng,
          lat: coordinates.lat,
        },
        onClose
      )
    );
  };

  const onSelectLocation = (clickEvent: ClickEventValue) => {
    const { lng, lat } = clickEvent;

    setCoordinates({
      lng,
      lat,
    });
  };

  return (
    <Dialog open={isOpen} onClose={closeFarmSaveModal} fullWidth maxWidth="lg">
      <DialogTitle>{isNew ? "Enrolll Farm" : "Update Farm"}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid container spacing={2} item xs={12} sm={12} md={4} lg={4} xl={4}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                label="Name"
                fullWidth
                {...bindFarmName}
                required
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <SimpleDropDown
                label="Barangay"
                required
                fullWidth
                bind={bindBarangayId}
                options={barangayLookup}
                hideEmptyOption={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <SimpleDropDown
                label="Area"
                required
                fullWidth
                bind={bindAreaId}
                options={areaLookup}
                hideEmptyOption={true}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                label="Address"
                fullWidth
                {...bindAddress}
                required
                multiline
                rows={5}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                label="Farm Size"
                type="number"
                {...bindAreaSize}
                required
                fullWidth
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">sqm.</InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
            <GoogleMapReact
              onClick={onSelectLocation}
              bootstrapURLKeys={{
                key: "AIzaSyAxZUt26k60tbv0UIiDIyEsQOfEUmFGhCc",
              }}
              defaultCenter={coordinates || tanauan_coords}
              defaultZoom={!!coordinates ? 15 : 12.5}
            >
              {!!coordinates && <LocationMarker {...coordinates} />}
            </GoogleMapReact>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button disabled={isSaving} onClick={onClose} color="primary">
          Cancel
        </Button>
        <ButtonLoading onClick={onSave} autoFocus text="Save" />
      </DialogActions>
      <ErrorAlert />
    </Dialog>
  );
};

export default FarmSaveModal;
