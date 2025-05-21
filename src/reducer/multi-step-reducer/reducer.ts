type FormData = {
  name: string;
  email: string;
  address: string;
  city: string;
  zipcode: string;
};

type State = {
  currentStep: number;
  formData: FormData;
};

type Action =
  | { type: "next_step" }
  | { type: "prev_step" }
  | { type: "change"; value: Partial<FormData> }
  | { type: "reset" };

export const initialState: State = {
  currentStep: 1,
  formData: {
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: "",
  },
};

export const reducer = (state: State, action: Action): State => {
  if (action.type === "next_step") {
    return {
      ...state,
      currentStep: state.currentStep + 1,
    };
  } else if (action.type === "prev_step") {
    return {
      ...state,
      currentStep: state.currentStep - 1,
    };
  } else if (action.type === "change") {
    return {
      ...state,
      formData: {
        ...state.formData,
        ...action.value,
      },
    };
  } else if (action.type === "reset") {
    return {
      ...initialState,
    };
  }

  throw new Error("Action type is not valid");
};