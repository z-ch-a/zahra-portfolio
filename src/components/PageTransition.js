import "../styles/transition.css";


function wait(ms) {
  return new Promise((resolve) => {
    window.setTimeout(
      resolve,
      ms
    );
  });
}


export async function runPageTransition({
  title = "PROJECT ARCHIVE",
  onSwitch,
} = {}) {

  /* ========================================================
     PREVENT MULTIPLE TRANSITIONS
     ======================================================== */

  if (
    document.querySelector(
      ".page-transition"
    )
  ) {
    return;
  }


  /* ========================================================
     CREATE SCREEN
     ======================================================== */

  const transition =
    document.createElement("div");


  transition.className =
    "page-transition";


  transition.innerHTML = `
    <div class="page-transition-content">

      <div class="page-transition-terminal-line">
        &gt; ACCESSING ${title.toUpperCase()}...
      </div>

      <div
        class="
          page-transition-terminal-line
          page-transition-status
        "
      >
        &gt; LOADING ENVIRONMENT
        <span class="page-transition-dots"></span>
      </div>


      <div class="page-transition-loading">

        <div class="page-transition-bar">

          <div
            class="page-transition-bar-fill"
          ></div>

        </div>


        <div class="page-transition-percent">
          00%
        </div>

      </div>


      <div class="page-transition-ready">
        &gt; READY.
      </div>

    </div>
  `;


  document.body.appendChild(
    transition
  );


  document.body.classList.add(
    "page-transition-running"
  );


  const fill =
    transition.querySelector(
      ".page-transition-bar-fill"
    );


  const percentage =
    transition.querySelector(
      ".page-transition-percent"
    );


  const ready =
    transition.querySelector(
      ".page-transition-ready"
    );


  /* ========================================================
     SHOW
     ======================================================== */

  requestAnimationFrame(() => {

    transition.classList.add(
      "page-transition--visible"
    );

  });


  await wait(220);



  /* ========================================================
     LOADING BAR
     ======================================================== */

  const duration = 1300;


  const startTime =
    performance.now();


  await new Promise((resolve) => {

    function animate(currentTime) {

      const elapsed =
        currentTime -
        startTime;


      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      /*
        Fast enough initially,
        slightly slower near completion.
      */

      const eased =
        1 -
        Math.pow(
          1 - progress,
          2.2
        );


      const value =
        Math.round(
          eased * 100
        );


      fill.style.width =
        `${value}%`;


      percentage.textContent =
        `${String(value).padStart(2, "0")}%`;


      if (
        progress < 1
      ) {

        requestAnimationFrame(
          animate
        );

      } else {

        resolve();

      }
    }


    requestAnimationFrame(
      animate
    );

  });



  /* ========================================================
     READY
     ======================================================== */

  ready.classList.add(
    "page-transition-ready--visible"
  );


  transition.classList.add(
    "page-transition--complete"
  );


  await wait(350);



  /* ========================================================
     SWITCH PAGE
     ======================================================== */

  if (
    typeof onSwitch ===
    "function"
  ) {

    onSwitch();

  }


  await wait(150);



  /* ========================================================
     EXIT
     ======================================================== */

  transition.classList.add(
    "page-transition--exit"
  );


  await wait(450);


  transition.remove();


  document.body.classList.remove(
    "page-transition-running"
  );
}