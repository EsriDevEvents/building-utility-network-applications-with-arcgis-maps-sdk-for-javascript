import "./styles.css";

import { getVersioningStates } from "@arcgis/core/versionManagement/utils";

import "@arcgis/map-components/components/arcgis-editor";
import "@arcgis/map-components/components/arcgis-map";
import "@arcgis/map-components/components/arcgis-version-management";
import "@arcgis/map-components/components/arcgis-version-management-service-item";
import "@arcgis/map-components/components/arcgis-version-management-version-item";
import "@arcgis/map-components/components/arcgis-version-management-version-list";
import "@arcgis/map-components/components/arcgis-version-management-version-properties";
import "@arcgis/map-components/components/arcgis-zoom";
import "@arcgis/map-components/components/arcgis-placement";

import { defineCustomElements } from "@esri/calcite-components/dist/loader";

defineCustomElements(window);

const startEditButton = document.getElementById(
  "start-edit",
) as HTMLCalciteActionElement;

const stopEditButton = document.getElementById(
  "stop-edit",
) as HTMLCalciteActionElement;

const undoEditButton = document.getElementById(
  "undo-edit",
) as HTMLCalciteActionElement;

const redoEditButton = document.getElementById(
  "redo-edit",
) as HTMLCalciteActionElement;

function updateButtonsStartEdit(): void {
  startEditButton.active = true;
  startEditButton.disabled = true;

  stopEditButton.active = false;
  stopEditButton.disabled = false;

  undoEditButton.disabled = false;
  redoEditButton.disabled = false;
}

function updateButtonsStopEdit(): void {
  startEditButton.active = false;
  startEditButton.disabled = false;

  stopEditButton.active = true;
  stopEditButton.disabled = true;

  undoEditButton.disabled = true;
  redoEditButton.disabled = true;
}

function handleMaybeError(result: any): void {
  if (!result.success) {
    console.error(`Error: ${result}`);
  }
}

const mapElement = document.querySelector("arcgis-map") as HTMLArcgisMapElement;
const versionComponent = document.createElement("arcgis-version-management");

mapElement.addEventListener(
  "arcgisViewReadyChange",
  async (event: HTMLArcgisMapElement["arcgisViewReadyChange"]) => {
    const { view } = event.target;

    versionComponent.view = view;
    versionComponent.versioningStates = await getVersioningStates(view, false);

    view.ui.add(versionComponent, "top-right");

    const versioningState = await versionComponent.versioningStates
      .getItemAt(0)
      ?.load();

    startEditButton.addEventListener("click", async () => {
      const result = await versioningState?.startEditing();
      if (result?.success) {
        updateButtonsStartEdit();
      }
    });

    stopEditButton.addEventListener("click", async () => {
      const result = await versioningState?.stopEditing(false);
      if (result?.success) {
        updateButtonsStopEdit();
      }
    });

    undoEditButton.addEventListener("click", async () => {
      const result = await versioningState?.undo();
      handleMaybeError(result);
    });

    redoEditButton.addEventListener("click", async () => {
      const result = await versioningState?.redo();
      handleMaybeError(result);
    });
  },
);
