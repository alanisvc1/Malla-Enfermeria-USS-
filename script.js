<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Malla Curricular - Enfermería</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1>Malla Curricular de Enfermería</h1>
  <div id="semesters-container"></div>
  <script>
    const courses = {
      "I Semestre": [
        { id: "biocel", name: "Biología celular", unlocks: ["fisiologia", "histo", "bioquim", "micro"] },
        { id: "anato", name: "Anatomía humana", unlocks: ["fisiologia"] },
        { id: "quimica", name: "Química general y orgánica", unlocks: ["bioquim"] },
        { id: "bases", name: "Bases conceptuales de la gestión del cuidado", unlocks: ["auxilios", "socio", "educacion"] },
        { id: "psico", name: "Psicología del desarrollo y aprendizaje", unlocks: ["ciclo"] },
      ],
      "II Semestre": [
        { id: "aprendizaje", name: "Estrategias para el aprendizaje" },
        { id: "fisiologia", name: "Fisiología humana", requires: ["biocel", "anato"], unlocks: ["farma1", "farma2", "fisio", "ciclo"] },
        { id: "histo", name: "Histoembriología", requires: ["biocel"] },
        { id: "bioquim", name: "Bioquímica general", requires: ["quimica"] },
        { id: "auxilios", name: "Primeros auxilios", requires: ["bases"] },
        { id: "socio", name: "Socioantropología en la Salud", requires: ["bases"] },
        { id: "form1", name: "Formación integral I" }
      ],
      "III Semestre": [
        { id: "micro", name: "Microbiología general", requires: ["biocel"] },
        { id: "farma1", name: "Farmacología general", requires: ["fisiologia", "histo", "bioquim"] },
        { id: "farma2", name: "Farmacología aplicada", requires: ["fisiologia", "histo", "bioquim"] },
        { id: "fisio", name: "Fisiopatología", requires: ["fisiologia", "histo", "bioquim"] },
        { id: "ciclo", name: "Enfermería en el ciclo vital", requires: ["psico", "fisiologia", "histo", "bioquim", "auxilios"] },
        { id: "educacion", name: "Educación en salud", requires: ["bases"] },
        { id: "antro", name: "Antropología" },
        { id: "form2", name: "Formación integral II", requires: ["form1"] },
      ],
      "IV Semestre": [
        { id: "comunitaria1", name: "Enfermería en Salud Comunitaria I", requires: ["ciclo", "educacion"] },
        { id: "metodos", name: "Metodologías de enseñanza y aprendizaje en salud", requires: ["micro", "farma1", "farma2", "fisio", "ciclo", "educacion"] },
        { id: "gcpersona", name: "Gestión del cuidado en la persona", requires: ["micro", "farma1", "farma2", "fisio", "ciclo"] },
        { id: "comunicacion", name: "Comunicación e interacción humana" },
        { id: "epidemio", name: "Epidemiología" },
        { id: "etica", name: "Ética", requires: ["antro"] },
        { id: "form3", name: "Formación integral III", requires: ["form2"] },
      ],
      "V Semestre": [
        { id: "electivo", name: "Electivo de formación integral", requires: ["etica"] },
        { id: "gcadulto", name: "Gestión del cuidado en el adulto", requires: ["comunitaria1", "metodos", "gcpersona", "comunicacion"] },
        { id: "saludmental", name: "Enfermería en Salud Mental", requires: ["comunitaria1", "metodos", "gcpersona", "comunicacion"] },
        { id: "admin", name: "Administración en enfermería" },
        { id: "form4", name: "Formación integral IV", requires: ["form3"] },
      ],
      "VI Semestre": [
        { id: "gcamayor", name: "Gestión del cuidado en el Adulto Mayor", requires: ["gcadulto", "saludmental"] },
        { id: "gcmujer", name: "Gestión del cuidado en la Mujer y en el Recién Nacido", requires: ["gcadulto", "saludmental"] },
        { id: "saludmental2", name: "Enfermería en alteraciones de la salud mental", requires: ["gcadulto", "saludmental"] },
        { id: "gesclinicos", name: "Gestión de enfermería en Servicios Clínicos", requires: ["admin"] },
        { id: "estadistica", name: "Estadística", requires: ["epidemio"] },
      ],
      "VII Semestre": [
        { id: "electivoprof", name: "Electivo profesional" },
        { id: "urgencia", name: "Enfermería de Urgencia", requires: ["gcamayor", "gcmujer", "saludmental2"] },
        { id: "gcniño", name: "Gestión del cuidado en el Niño y la Niña", requires: ["gcamayor", "gcmujer", "saludmental2"] },
        { id: "investigacion1", name: "Investigación", requires: ["estadistica"] },
        { id: "eticaenf", name: "Ética en enfermería", requires: ["gcadulto"] },
      ],
      "VIII Semestre": [
        { id: "comunitaria2", name: "Enfermería en Salud Comunitaria II", requires: ["urgencia", "gcniño"] },
        { id: "investigacion2", name: "Investigación II", requires: ["investigacion1"] },
        { id: "gcurgencia", name: "Gestión del cuidado en los Servicios de Urgencia", requires: ["urgencia", "gcniño"] },
        { id: "gcadolescente", name: "Gestión del cuidado en el adolescente", requires: ["gcniño"] },
      ],
      "IX Semestre ": [
        { id: "internadointra", name: "Internado intrahospitalario", requires: ["comunitaria2", "investigacion2", "gcurgencia", "gcadolescente", "form4"] },
      ],
      "X Semestre": [
        { id: "internadoextra", name: "Internado extrahospitalario", requires: ["comunitaria2", "investigacion2", "gcurgencia", "gcadolescente", "form4"] },
      ]
    };

    const approved = JSON.parse(localStorage.getItem("approvedCourses") || "{}");

    function createCourse(course) {
      const div = document.createElement("div");
      div.className = "course";
      div.id = course.id;
      div.textContent = course.name;

      const isCompleted = approved[course.id];
      const isLocked = course.requires && !course.requires.every(req => approved[req]);

      if (isLocked && !isCompleted) div.classList.add("locked");
      if (isCompleted) div.classList.add("completed");

      div.addEventListener("click", () => {
        approved[course.id] = !approved[course.id];
        localStorage.setItem("approvedCourses", JSON.stringify(approved));
        renderAll();
      });

      return div;
    }

    function renderAll() {
      const container = document.getElementById("semesters-container");
      container.innerHTML = "";

      for (const [semester, courseList] of Object.entries(courses)) {
        const section = document.createElement("div");
        section.className = "semester";

        const title = document.createElement("h2");
        title.textContent = semester;

        const grid = document.createElement("div");
        grid.className = "course-grid";

        for (const course of courseList) {
          const card = createCourse(course);
          grid.appendChild(card);
        }

        section.appendChild(title);
        section.appendChild(grid);
        container.appendChild(section);
      }
    }

    renderAll();
  </script>
  <style>
    body {
      font-family: 'Segoe UI', sans-serif;
      background-color: #fdf6ef;
      margin: 0;
      padding: 20px;
      color: #1f3a56;
    }

    h1 {
      text-align: center;
      margin-bottom: 40px;
      color: #0e2f44;
    }

    .semester {
      margin-bottom: 40px;
      padding: 20px;
      background-color: #e6f0f3;
      border-radius: 16px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }

    .semester h2 {
      color: #14575c;
      margin-bottom: 10px;
    }

    .course-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .course {
      flex: 1 1 180px;
      padding: 15px;
      border-radius: 12px;
      background-color: #ffffff;
      border: 2px solid #ccc;
      cursor: pointer;
      transition: background-color 0.3s, border-color 0.3s;
      user-select: none;
    }

    .course.locked {
      opacity: 0.5;
      pointer-events: none;
      background-color: #eeeeee;
    }

    .course.completed {
      background-color: #a8dadc;
      border-color: #457b9d;
      color: #1d3557;
    }
  </style>
</body>
</html>
