angular.module('TodoAppIntec')

.factory('AboutUsServ', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var peoples = [
                {
                  id: 0,
                  name: 'Andrea L. Polanco',
                  description: 'Nacida para vivir de la tecnologia. Me encanta ver los nuevos que la misma. Tengo como objetivo destacarme en el campo de los videojuegos.',
                  image: 'img/andrea.jpeg'
                },
                {
                  id: 1,
                  name: 'Angel Emilio Contreras',
                  description: `Gran amante de las TI. Tengo como objetivo desarrollar software para ayudar a mi país a ser mejor. Soy un joven creativo, colaborador y autodidacta.
                                Conocedor de herramientas orientado al desarrollo de software / base de datos, tanto comerciales como de código abierto, técnicas de desarrollo en equipo y manejo de proyectos, patrones de diseño y estándares de seguridad informática.`,
                  image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAheAAAAJDFlZmIyM2ZhLTgyMGUtNGVjOC05MjlmLTExYWZiOGM4MWFjNA.jpg'
                },
                {
                  id: 2,
                  name: 'Brawny Javier Mateo',
                  description: 'Proximamente',
                  image: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAseAAAAJDdkZmNjNzUwLTJhNzgtNGNjYS04YmY1LWIwNjdkNGQzZWQ4OA.jpg'
                }
            ];

  return {
    all: function() {
      return peoples;
    },
    get: function(peopleID) {
      for (var i = 0; i < peoples.length; i++) {
        if (peoples[i].id === parseInt(peopleID)) {
          return peoples[i];
        }
      }
      return null;
    }
  };
});