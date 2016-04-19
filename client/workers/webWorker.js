import createRemoteStore from 'remote/store/remoteStore'

const store = createRemoteStore()

self.addEventListener('message', msg => {
  console.log('[REMOTE] receive message', msg.data)
  store.dispatch(msg.data);
}, false);

store.subscribe(()=> {
  console.log('[REMOTE] store update', store.getState())
  self.postMessage(store.getState())
});
