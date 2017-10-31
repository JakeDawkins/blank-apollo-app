// const hijackThatShit = new ApolloLink((operation, forward) => {
//   const observable = forward(operation);

//   return new Observable(observer => {
//     const subscription = observable.subscribe({
//       next: r => {
//         r && r.data && r.data.jakes && r.data.jakes.length
//           ? observer.next({
//               data: {
//                 jakes: r.data.jakes.map(j => ({ ...j, firstName: 'harambe' })),
//               },
//             })
//           : observer.next(r);
//       },
//       error: e => {
//         console.log('error', e);
//         observer.error(e);
//       },
//       complete: observer.complete.bind(observer),
//     });
//   });
// });
