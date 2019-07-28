var app = new Vue({
  el: '#app',
  components: {
  	'carousel': VueCarousel.Carousel,
    'slide': VueCarousel.Slide
  },
  data: {
    menu: [],
    todaysIndex: 0,
    // menu: [
    //   {
    //     "day": "M",
    //     "lunchCommon": "Ensalada Amazónica",
    //     "lunchLuis": "Pechuga de pollo al limón",
    //     "lunchElena": "Lenguado a la plancha",
    //     "dinnerCommon": "Gazpacho de Manzana; Bocadillo de Tortillas Equidieta",
    //     "dinnerLuis": null,
    //     "dinnerElena": null
    //   },
    //   {
    //     "day": "T",
    //     "lunchCommon": "Lentejas",
    //     "lunchLuis": "Ensalada",
    //     "lunchElena": "Gambas",
    //     "dinnerCommon": "Gazpacho Andaluz",
    //     "dinnerLuis": "Gazpacho Andaluz",
    //     "dinnerElena": "Ensalada Canónigos y Berberechos"
    //   },
    //   {
    //     "day": "W",
    //     "lunchCommon": "Ensalada de Frutas",
    //     "lunchLuis": "Solomillo de Ternera",
    //     "lunchElena": null,
    //     "dinnerCommon": "Ensalada de Rúcula y Olivas",
    //     "dinnerLuis": "Tomate relleno de Atún y perejil",
    //     "dinnerElena": "Verduras asadas"
    //   },
    //   {
    //     "day": "Th",
    //     "lunchCommon": "Gazpacho Andaluz; Dorada al Horno",
    //     "lunchLuis": null,
    //     "lunchElena": null,
    //     "dinnerCommon": "Queso Fresco; Fiambre de Pavo; Piña",
    //     "dinnerLuis": "Crema Verde",
    //     "dinnerElena": null
    //   },
    //   {
    //     "day": "F",
    //     "lunchCommon": "Brecol Hervido",
    //     "lunchLuis": "Pollo al Limón",
    //     "lunchElena": "Champiñones Salteados",
    //     "dinnerCommon": "Puré de Calabacín; Bacalao al Ajo",
    //     "dinnerLuis": null,
    //     "dinnerElena": null
    //   },
    //   {
    //     "day": "S",
    //     "lunchCommon": "Sopa de Col con Huevo; Lenguado a la Plancha",
    //     "lunchLuis": null,
    //     "lunchElena": null,
    //     "dinnerCommon": "Calabacines con Orégano; Langostinos a la Plancha",
    //     "dinnerLuis": null,
    //     "dinnerElena": null
    //   },
    //   {
    //     "day": "Su",
    //     "lunchCommon": null,
    //     "lunchLuis": "Espárragos; Sashimi de Salmón",
    //     "lunchElena": "Sateado de Calabacín, Zanahoria y Cebolla; Salmón a la Plancha",
    //     "dinnerCommon": "Ensalada Verde con Atún y Cebolla",
    //     "dinnerLuis": "Sandía",
    //     "dinnerElena": null
    //   }
    // ]
  },
  computed: {
    // days () {
    //   let date = new Date()
    //   return this.menu.map((menuEntry, index) => {
    //     return {
    //       day: menuEntry.day,
    //       todays: date.getDay()-1 === index
    //     }
    //   })
    // },
    //
    // lunches () {
    //   let date = new Date()
    //   return this.menu.map((menuEntry, index) => {
    //     return {
    //       common: menuEntry.lunchCommon ? menuEntry.lunchCommon.split(';') : null,
    //       luis: menuEntry.lunchLuis ? menuEntry.lunchLuis.split(';') : null,
    //       elena: menuEntry.lunchElena ? menuEntry.lunchElena.split(';') : null,
    //       todays: date.getDay()-1 === index
    //     }
    //   })
    // },
    //
    // dinners () {
    //   let date = new Date()
    //   return this.menu.map((menuEntry, index) => {
    //     return {
    //       common: menuEntry.dinnerCommon ? menuEntry.dinnerCommon.split(';') : null,
    //       luis: menuEntry.dinnerLuis ? menuEntry.dinnerLuis.split(';') : null,
    //       elena: menuEntry.dinnerElena ? menuEntry.dinnerElena.split(';') : null,
    //       todays: date.getDay()-1 === index
    //     }
    //   })
    // }
  },
  methods: {
    getTodayIndex () {
      let day = new Date().getDay() - 1
      console.log(`[todayIndex] ${(day < 0) ? 6 : day}`)
      return (day < 0) ? 6 : day
    }
  },
  mounted () {
    console.log(this.menu)
    console.log(this.lunches)
    console.log(this.dinners)

    console.log(this.menu)
    let _self = this

    fetch('https://api.sheety.co/099eec95-de38-4817-b6c2-70b6ff380ff2')
      .then(function(response) {
        return response.json()
      })
      .then(function(myJson) {
        console.log(myJson)
        let _split = function(field) {
          if (field) return field.split(';')
        }

        let todaysIndex = _self.getTodayIndex()

        _self.menu = myJson.map(
          (item, index) => {
            return {
              day: item.day,
              todays: index === todaysIndex,
              lunchCommon: _split(item.lunchCommon),
              lunchLuis: _split(item.lunchLuis),
              lunchElena: _split(item.lunchElena),
              dinnerCommon: _split(item.dinnerCommon),
              dinnerLuis: _split(item.dinnerLuis),
              dinnerElena: _split(item.dinnerElena)
            }
          }
        )

        // _self.todaysIndex = todaysIndex

        setTimeout(
          () => {_self.todaysIndex = todaysIndex; console.log('y')},
          100
        )

        console.log(_self.menu)
        // _self.menu = myJson
      });
  }
});
