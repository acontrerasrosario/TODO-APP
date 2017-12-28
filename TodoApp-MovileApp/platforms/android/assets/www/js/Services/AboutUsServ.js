angular.module('TodoAppIntec')

.factory('AboutUsServ', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var peoples = [
                {
                  id: 0,
                  name: 'Andrea L. Polanco',
                  description: 'You on your way?',
                  image: 'img/ionic.png'
                },
                {
                  id: 1,
                  name: 'Angel Emilio Contreras',
                  description: `Gran amante de las TI. Tengo como objetivo desarrollar software para ayudar a mi país a ser mejor. Soy un joven creativo, colaborador y autodidacta.
                                Conocedor de herramientas orientado al desarrollo de software / base de datos, tanto comerciales como de código abierto, técnicas de desarrollo en equipo y manejo de proyectos, patrones de diseño y estándares de seguridad informática.`,
                  image: 'img/ionic.png'
                },
                {
                  id: 2,
                  name: 'Brawny Javier Mateo',
                  description: 'You on your way?',
                  image: 'img/ionic.png'
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
