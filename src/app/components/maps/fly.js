export    const flyTo = (view, location, done) =>{
  const duration = 5000;
  const zoom = 4; //view.getZoom();
 //lop
  let parts = 2;
  let called = false;
  function callback(complete) {
    --parts;
    if (called) {
      return;
    }
    if (parts === 0 || !complete) {
      called = true;
      done(complete);
    }
  }
  view.animate(
    {
      center: location,
      duration: duration,
    },
    callback
  );
  view.animate(
    // {
    //   zoom: 3, //zoom - 1,
    //   duration: duration / 2,
    // },
    {
      zoom: 11, // zoom,
      duration: duration / 2,
    },
    callback
  );
}