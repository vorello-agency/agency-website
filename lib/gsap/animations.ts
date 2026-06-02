import { gsap } from "./register";

// ==========================================
// 1. ANIMACIONES DEL NAVBAR
// ==========================================

export const animateNavbarIconEnter = (label: string, svg: SVGElement) => {
  if (label === "Servicios") {
    const paths = svg.querySelectorAll("path");
    if (paths.length >= 12) {
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(svg, { scale: 1.15, duration: 0.3, ease: "power2.out" })
        .to(Array.from(paths).slice(8, 12), { 
          y: -2.2, 
          duration: 0.45, 
          ease: "power2.out" 
        }, 0)
        .to(Array.from(paths).slice(0, 8), { 
          scaleY: 0.94, 
          transformOrigin: "bottom center", 
          duration: 0.18, 
          ease: "power1.out" 
        }, 0)
        .to(Array.from(paths).slice(0, 8), { 
          scaleY: 1, 
          transformOrigin: "bottom center", 
          duration: 0.25, 
          ease: "power1.inOut" 
        }, 0.18);
    }
  } else if (label === "Proceso") {
    const circles = svg.querySelectorAll("circle");
    const path = svg.querySelector("path");
    if (circles.length >= 2 && path) {
      gsap.set(path, { strokeDasharray: 30, strokeDashoffset: 30 });
      gsap.set(circles, { scale: 0, transformOrigin: "center center" });

      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(svg, { rotation: 15, scale: 1.15, duration: 0.2, ease: "power1.out" })
        .to(circles[1], { scale: 1.3, duration: 0.2, ease: "back.out(2)" })
        .to(path, { strokeDashoffset: 0, duration: 0.35, ease: "power2.inOut" })
        .to(circles[0], { scale: 1.3, duration: 0.2, ease: "back.out(2)" })
        .to(circles, { scale: 1, duration: 0.15, ease: "power1.out" })
        .to(svg, { rotation: 0, duration: 0.3, ease: "back.out(1.5)" }, "-=0.2");
    }
  } else if (label === "Manifiesto") {
    const paths = svg.querySelectorAll("path");
    if (paths.length > 0) {
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(svg, { scale: 1.15, duration: 0.3, ease: "power2.out" })
        .fromTo(paths,
          { opacity: 0.3, strokeWidth: 1.5 },
          {
            opacity: 1,
            strokeWidth: 2.5,
            duration: 0.2,
            stagger: 0.03,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
            onComplete: () => {
              gsap.to(paths, { opacity: 0.7, strokeWidth: 2, duration: 0.2 });
            }
          },
          0
        );
    }
  } else if (label === "Contacto") {
    const paths = svg.querySelectorAll("path");
    if (paths.length >= 2) {
      const plane = paths[0];
      const line = paths[1];
      const tl = gsap.timeline({ overwrite: "auto" });
      
      tl.to(svg, { scale: 1.15, duration: 0.2 })
        .to(plane, { x: 12, y: -12, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
        .to(line, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" }, 0)
        .set(plane, { x: -12, y: 12, opacity: 0 })
        .set(line, { scale: 0, opacity: 0 })
        .to(plane, { x: 0, y: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
        .to(line, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" }, "-=0.3")
        .to(svg, { scale: 1, duration: 0.3 });
    }
  }
};

export const animateNavbarIconLeave = (label: string, svg: SVGElement) => {
  gsap.killTweensOf(svg);
  gsap.to(svg, { scale: 1, rotation: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });

  const paths = svg.querySelectorAll("path");
  const circles = svg.querySelectorAll("circle");

  if (paths.length > 0) {
    gsap.killTweensOf(paths);
    gsap.to(paths, { x: 0, y: 0, opacity: 0.6, scale: 1, strokeWidth: 2, strokeDashoffset: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  }
  if (circles.length > 0) {
    gsap.killTweensOf(circles);
    gsap.to(circles, { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  }
};

export const animateNavbarCtaArrowEnter = (arrow: HTMLElement) => {
  const tl = gsap.timeline({ overwrite: "auto" });
  tl.to(arrow, { x: 8, opacity: 0, duration: 0.18, ease: "power2.in" })
    .set(arrow, { x: -8, opacity: 0 })
    .to(arrow, { x: 0, opacity: 1, duration: 0.4, ease: "back.out(2)" });
};

export const animateNavbarCtaArrowLeave = (arrow: HTMLElement) => {
  gsap.killTweensOf(arrow);
  gsap.to(arrow, { x: 0, opacity: 0.6, duration: 0.3, ease: "power2.out", overwrite: "auto" });
};

// ==========================================
// 2. ANIMACIONES DE LA SECCIÓN PROCESO
// ==========================================

export const animateProcessIconEnter = (stepNum: string, svg: SVGElement) => {
  if (stepNum === "01") {
    const needle = svg.querySelector("path");
    const dial = svg.querySelector("circle");
    if (needle && dial) {
      gsap.set(dial, { rotation: 0, transformOrigin: "center center" });
      gsap.set(needle, { rotation: 0, transformOrigin: "center center" });

      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(dial, {
        scale: 1.08,
        rotation: -45,
        transformOrigin: "center center",
        duration: 0.8,
        ease: "power2.out",
      });

      const needleTl = gsap.timeline({ overwrite: "auto" });
      needleTl.to(needle, {
        rotation: 270,
        transformOrigin: "center center",
        duration: 0.3,
        ease: "power2.in",
      })
      .to(needle, {
        rotation: 410,
        transformOrigin: "center center",
        duration: 0.18,
        ease: "power1.out",
      })
      .to(needle, {
        rotation: 325,
        transformOrigin: "center center",
        duration: 0.15,
        ease: "power1.inOut",
      })
      .to(needle, {
        rotation: 380,
        transformOrigin: "center center",
        duration: 0.12,
        ease: "power1.inOut",
      })
      .to(needle, {
        rotation: 348,
        transformOrigin: "center center",
        duration: 0.1,
        ease: "power1.inOut",
      })
      .to(needle, {
        rotation: 366,
        transformOrigin: "center center",
        duration: 0.08,
        ease: "power1.inOut",
      })
      .to(needle, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 0.06,
        ease: "power2.out",
      });
    }
  } else if (stepNum === "02") {
    const circles = svg.querySelectorAll("circle");
    const path = svg.querySelector("path");
    if (circles.length >= 2 && path) {
      gsap.set(path, { strokeDasharray: 50, strokeDashoffset: 50 });
      
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.fromTo(circles[0], 
        { scale: 0, transformOrigin: "center center" }, 
        { scale: 1.25, duration: 0.25, ease: "back.out(2)" }
      )
      .fromTo(path, 
        { strokeDashoffset: 50 }, 
        { strokeDashoffset: 0, duration: 0.45, ease: "power1.inOut" }
      )
      .fromTo(circles[1], 
        { scale: 0, transformOrigin: "center center" }, 
        { scale: 1.25, duration: 0.25, ease: "back.out(2)" }
      );
    }
  } else if (stepNum === "03") {
    const rect = svg.querySelector("rect");
    const paths = svg.querySelectorAll("path");
    if (rect && paths.length >= 2) {
      gsap.set(rect, { scale: 1, transformOrigin: "center center" });
      gsap.set(paths[0], { strokeDasharray: 18, strokeDashoffset: 18 });
      gsap.set(paths[1], { strokeDasharray: 12, strokeDashoffset: 12, x: 0 });

      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(rect, {
        scaleX: 1.08,
        scaleY: 0.92,
        transformOrigin: "center center",
        duration: 0.2,
        ease: "power1.out",
      })
      .to(rect, {
        scaleX: 0.96,
        scaleY: 1.04,
        duration: 0.15,
        ease: "power1.inOut",
      })
      .to(rect, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.2,
        ease: "power2.out",
      })
      .to(paths[0], {
        strokeDashoffset: 0,
        duration: 0.35,
        ease: "power2.out",
      }, "-=0.25")
      .to(paths[1], {
        strokeDashoffset: 0,
        duration: 0.3,
        ease: "power2.inOut",
      }, "-=0.1")
      .to(paths[1], {
        x: -3,
        duration: 0.25,
        ease: "power2.inOut",
      })
      .to(paths[1], {
        x: 2,
        duration: 0.3,
        ease: "back.out(2)",
      })
      .to(paths[1], {
        x: 0,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  } else if (stepNum === "04") {
    const paths = svg.querySelectorAll("path");
    if (paths.length >= 3) {
      // Establecer estados iniciales de rotación y traslación limpia
      gsap.set(paths[0], { x: 0 }); // >
      gsap.set(paths[1], { x: 0 }); // <
      gsap.set(paths[2], { strokeDasharray: 20, strokeDashoffset: 20, opacity: 0.4 }); // /

      const tl = gsap.timeline({ overwrite: "auto" });
      
      // 1. Expandir suavemente los brackets hacia los lados sin rebotes bruscos
      tl.to(paths[1], {
        x: -2.5,
        duration: 0.45,
        ease: "power2.out",
      })
      .to(paths[0], {
        x: 2.5,
        duration: 0.45,
        ease: "power2.out",
      }, 0)
      // 2. Efecto de haz láser / dibujado de código en la barra diagonal central (path[2])
      .to(paths[2], {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.55,
        ease: "power1.inOut",
      }, "-=0.25");
    }
  } else if (stepNum === "05") {
    const allPaths = svg.querySelectorAll("path");
    const needle = allPaths[0];
    if (needle) {
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(needle, {
        rotation: -90,
        svgOrigin: "12 14",
        duration: 0.45,
        ease: "power2.in",
      })
      .to(needle, {
        rotation: 0,
        svgOrigin: "12 14",
        duration: 0.7,
        ease: "back.out(1.7)",
      })
      .to(needle, { rotation: 6, svgOrigin: "12 14", duration: 0.06, ease: "none" })
      .to(needle, { rotation: -5, svgOrigin: "12 14", duration: 0.06, ease: "none" })
      .to(needle, { rotation: 3, svgOrigin: "12 14", duration: 0.06, ease: "none" })
      .to(needle, { rotation: -2, svgOrigin: "12 14", duration: 0.06, ease: "none" })
      .to(needle, { rotation: 0, svgOrigin: "12 14", duration: 0.08, ease: "power1.out" });
    }
  } else if (stepNum === "06") {
    gsap.killTweensOf(svg);
    gsap.timeline()
      .to(svg, {
        y: -5,
        x: 3,
        duration: 0.35,
        ease: "power2.out",
      })
      .to(svg, {
        x: "+=0.8",
        yoyo: true,
        repeat: 5,
        duration: 0.05,
      }, "-=0.1");
  } else if (stepNum === "07") {
    const circles = svg.querySelectorAll("circle");
    const paths = svg.querySelectorAll("path");
    if (circles.length >= 3 && paths.length >= 2) {
      gsap.set(circles[0], { scale: 1, transformOrigin: "center center" });
      gsap.set([paths[0], paths[1]], { strokeDasharray: 50, strokeDashoffset: 50 });
      gsap.set([circles[1], circles[2]], { 
        scale: 0, 
        rotation: 0, 
        svgOrigin: "12 12" 
      });

      const tl = gsap.timeline({ overwrite: "auto" });
      tl.fromTo(circles[0],
        { scale: 0.5 },
        { scale: 1.3, duration: 0.3, ease: "back.out(2)" }
      )
      .to([paths[0], paths[1]], {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: "power2.inOut",
      }, "-=0.15")
      .to([circles[1], circles[2]], {
        scale: 1.3,
        duration: 0.25,
        ease: "back.out(2)",
        stagger: 0.1,
      }, "-=0.3")
      .to(circles[1], {
        rotation: 180,
        svgOrigin: "12 12",
        duration: 0.9,
        ease: "back.out(1.5)",
      }, "-=0.1")
      .to(circles[2], {
        rotation: 180,
        svgOrigin: "12 12",
        duration: 0.9,
        ease: "back.out(1.5)",
      }, "-=0.9");
    }
  }
};

export const animateProcessIconLeave = (stepNum: string, svg: SVGElement) => {
  if (stepNum === "01") {
    const needle = svg.querySelector("path");
    const dial = svg.querySelector("circle");
    if (needle && dial) {
      gsap.to(dial, {
        scale: 1,
        rotation: 0,
        transformOrigin: "center center",
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
      gsap.to(needle, {
        rotation: 0,
        transformOrigin: "center center",
        duration: 0.6,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  } else if (stepNum === "02") {
    const circles = svg.querySelectorAll("circle");
    const path = svg.querySelector("path");
    if (circles.length > 0) {
      gsap.to(circles, {
        scale: 1,
        transformOrigin: "center center",
        stagger: 0.05,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
    if (path) {
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  } else if (stepNum === "03") {
    const rect = svg.querySelector("rect");
    const paths = svg.querySelectorAll("path");
    
    const tl = gsap.timeline({ overwrite: "auto" });
    tl.to(rect, {
      scale: 1,
      scaleX: 1,
      scaleY: 1,
      transformOrigin: "center center",
      duration: 0.4,
      ease: "power2.out",
    })
    .to(paths[0], {
      strokeDashoffset: 0,
      duration: 0.4,
      ease: "power2.out",
    }, 0)
    .to(paths[1], {
      strokeDashoffset: 0,
      x: 0,
      duration: 0.4,
      ease: "power2.out",
    }, 0);
  } else if (stepNum === "04") {
    const paths = svg.querySelectorAll("path");
    if (paths.length >= 3) {
      gsap.to(paths[1], { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(paths[0], { x: 0, duration: 0.4, ease: "power2.out", overwrite: "auto" });
      gsap.to(paths[2], { strokeDashoffset: 0, opacity: 0.6, duration: 0.4, ease: "power2.out", overwrite: "auto" });
    }
  } else if (stepNum === "05") {
    const allPaths = svg.querySelectorAll("path");
    const needle = allPaths[0];
    if (needle) {
      gsap.to(needle, {
        rotation: 0,
        svgOrigin: "12 14",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  } else if (stepNum === "06") {
    gsap.killTweensOf(svg);
    gsap.to(svg, {
      y: 0,
      x: 0,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  } else if (stepNum === "07") {
    const circles = svg.querySelectorAll("circle");
    const paths = svg.querySelectorAll("path");
    
    const tl = gsap.timeline({ overwrite: "auto" });
    tl.to(circles, {
      scale: 1,
      rotation: 0,
      svgOrigin: "12 12",
      transformOrigin: "center center",
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.05,
    })
    .to(paths, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: "power2.out",
    }, 0);
  }
};

// ==========================================
// 3. ANIMACIONES DE LA SECCIÓN TECNOLOGÍAS
// ==========================================

export const animateTechIconEnter = (layerNum: string, svg: SVGElement) => {
  if (layerNum === "1") {
    const paths = svg.querySelectorAll("path");
    if (paths.length >= 3) {
      const tl = gsap.timeline({ overwrite: "auto" });
      tl.to(paths[0], { y: -3, duration: 0.35, ease: "back.out(2)" })
        .to(paths[2], { y: 3, duration: 0.35, ease: "back.out(2)" }, 0);
    }
  } else if (layerNum === "2") {
    const leds = svg.querySelectorAll("line");
    const rects = svg.querySelectorAll("rect");
    
    const tl = gsap.timeline({ overwrite: "auto" });
    tl.to(leds, {
      opacity: 0.2,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      stagger: 0.1,
    });
    
    gsap.to(rects, {
      scale: 1.05,
      transformOrigin: "center center",
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  } else if (layerNum === "3") {
    const path = svg.querySelector("path");
    const circles = svg.querySelectorAll("circle");
    
    const tl = gsap.timeline({ overwrite: "auto" });
    tl.to(path, {
      rotation: 12,
      transformOrigin: "center center",
      duration: 0.3,
      ease: "power2.out",
    })
    .to(path, {
      rotation: -8,
      duration: 0.25,
      ease: "power2.inOut",
    })
    .to(path, {
      rotation: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.fromTo(circles,
      { scale: 0.5, transformOrigin: "center center" },
      {
        scale: 1.4,
        transformOrigin: "center center",
        duration: 0.25,
        stagger: 0.06,
        ease: "back.out(2.5)",
        overwrite: "auto",
        onComplete: () => {
          gsap.to(circles, { scale: 1, transformOrigin: "center center", duration: 0.2 });
        }
      }
    );
  } else if (layerNum === "4") {
    const rect = svg.querySelector("rect");
    const paths = svg.querySelectorAll("path");
    
    if (rect) {
      gsap.to(rect, {
        scale: 1.08,
        transformOrigin: "center center",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
    if (paths.length > 0) {
      gsap.fromTo(paths, 
        { opacity: 0.4 },
        {
          opacity: 1,
          duration: 0.18,
          repeat: 3,
          yoyo: true,
          stagger: 0.04,
          ease: "power1.inOut",
          overwrite: "auto"
        }
      );
    }
  }
};

export const animateTechIconLeave = (layerNum: string, svg: SVGElement) => {
  if (layerNum === "1") {
    const paths = svg.querySelectorAll("path");
    gsap.to(paths, { y: 0, duration: 0.3, ease: "power2.out", overwrite: "auto" });
  } else if (layerNum === "2") {
    const leds = svg.querySelectorAll("line");
    const rects = svg.querySelectorAll("rect");
    gsap.killTweensOf(leds);
    gsap.to(leds, { opacity: 1, duration: 0.3, overwrite: "auto" });
    gsap.to(rects, { scale: 1, transformOrigin: "center center", duration: 0.3, overwrite: "auto" });
  } else if (layerNum === "3") {
    const path = svg.querySelector("path");
    const circles = svg.querySelectorAll("circle");
    gsap.killTweensOf([path, circles]);
    gsap.to(path, { rotation: 0, transformOrigin: "center center", duration: 0.4, overwrite: "auto" });
    gsap.to(circles, { scale: 1, transformOrigin: "center center", duration: 0.4, overwrite: "auto" });
  } else if (layerNum === "4") {
    const rect = svg.querySelector("rect");
    const paths = svg.querySelectorAll("path");
    gsap.killTweensOf([rect, paths]);
    if (rect) gsap.to(rect, { scale: 1, transformOrigin: "center center", duration: 0.3, overwrite: "auto" });
    if (paths.length > 0) gsap.to(paths, { opacity: 1, duration: 0.3, overwrite: "auto" });
  }
};
