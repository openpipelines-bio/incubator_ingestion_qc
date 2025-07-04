import { createForm } from "@tanstack/solid-form";
import { createContext, ParentComponent, useContext } from "solid-js";
import { Settings } from "~/types";

export type SettingsState = {
  sampleSelection: {
    selectedSamples: string[];
  }
  globalVisualization: {
    groupingEnabled: boolean;
    groupBy: string;
  }
  filters: {
    enabled: boolean;
    settings: Settings;
  }
}

export const defaultSettings: SettingsState = {
  sampleSelection: {
    selectedSamples: []
  },
  globalVisualization: {
    groupingEnabled: true,
    groupBy: "sample_id",
  },
  filters: {
    enabled: false,
    settings: {}
  }
}

export function createSettingsForm () {
  const form = createForm(() => ({
    defaultValues: defaultSettings,
    listeners: {
      onChange: ({formApi}) => {
        console.log("Settings changed:", formApi.state.values);
      }
    }
  }))

  return form
}

export type SettingsFormReturnType = ReturnType<typeof createSettingsForm>;

// we create a context to provide the form to many components
const SettingsFormContext = createContext<SettingsFormReturnType>();

export const SettingsFormProvider: ParentComponent<{form: SettingsFormReturnType}> = (props) => {
  return (
    <SettingsFormContext.Provider value={props.form}>
      {props.children}
    </SettingsFormContext.Provider>
  );
}
export const useSettingsForm = () => {
  const form = useContext(SettingsFormContext);
  if (!form) {
    throw new Error("useSettingsForm must be used within a SettingsFormProvider");
  }
  return form;
}