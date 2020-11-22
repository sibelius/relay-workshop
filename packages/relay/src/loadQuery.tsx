// tiny wrapper to handle wrong loadQuery export on react-relay/hooks
import { loadQuery as loadQueryModule } from 'react-relay/hooks';

const { loadQuery } = loadQueryModule;

export {
  loadQuery,
};
