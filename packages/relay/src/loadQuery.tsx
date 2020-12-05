// tiny wrapper to handle wrong loadQuery export on react-relay/hooks
import { loadQuery as loadQueryModule } from 'react-relay/hooks';
type loadQueryType = typeof loadQueryModule;
const { loadQuery } = (loadQueryModule as any) as { loadQuery: loadQueryType };
export { loadQuery };
