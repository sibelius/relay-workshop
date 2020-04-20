import { OperationDescriptor } from 'relay-runtime';

// get mutation variables from operation
export const getMutationOperationVariables = (operation: OperationDescriptor) => {
  return operation.fragment.variables;
};
