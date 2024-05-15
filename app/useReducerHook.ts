import { ProductData } from "./interface";

interface SelectedProd {
    id: number;
    count: number;
  }
  const initialState: SelectedProd[] = [];
  
  type Action =
    | { type: "INCREMENT"; payload: ProductData }
    | { type: "DECREMENT"; payload: ProductData }
    | {type:"REMOVE";payload:ProductData}
    | { type: "RESET" };
  
 export  function reducer(state: SelectedProd[], action: Action) {
    switch (action.type) {
      case "INCREMENT": {
        const SelectedProductIdx = state.findIndex(
          (p) => p.id === action.payload.id
        );
        if (SelectedProductIdx === -1)
          return [
            ...state,
            { id: action.payload.id, count: 1, selectedCard: action.payload },
          ];
        const clone = [...state];
        const SelectedProduct = clone[SelectedProductIdx];
        const updatedSelectedProduct = {
          ...SelectedProduct,
          count: SelectedProduct.count + 1,
        };
        clone[SelectedProductIdx] = updatedSelectedProduct;
        return clone;
      }
      case "DECREMENT": {
        const SelectedProductIdx = state.findIndex(
          (p) => p.id === action.payload.id
        );
        if (SelectedProductIdx === -1)
          return [
            ...state,
            { id: action.payload.id, count: 1, selectedCard: action.payload },
          ];
        const clone = [...state];
        const SelectedProduct = clone[SelectedProductIdx];
        const updatedSelectedProduct = {
          ...SelectedProduct,
          count: SelectedProduct.count - 1,
        };
        clone[SelectedProductIdx] = updatedSelectedProduct;
        return clone;
      }
      case "REMOVE":
      return state.filter((product) => product.id !== action.payload.id);
      case "RESET":
        return initialState;
    }
  }