
import createClient from 'common/createClient'
import { initialState, remoteStore } from 'common/createStore'

const client = createClient()
const store = remoteStore(initialState, client)

self.addEventListener('message', msg => {
  console.log('WW message', msg.data)
  store.dispatch(msg.data);
}, false);

store.subscribe(()=> {
  console.log('WW store')
  self.postMessage(store.getState())
});
