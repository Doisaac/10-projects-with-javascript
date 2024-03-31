const jsonForm = document.querySelector('#jsonform')
const csvForm = document.querySelector('#csvform')
const bConvert = document.querySelector('#bConvert')


bConvert.addEventListener('click', () => {
  convertJSONtoCSV()
})

function convertJSONtoCSV() {
  let json;
  let keys = []
  let values = []

  try {
    json = JSON.parse(jsonForm.value)
  } catch (error) {
    alert('Wrong JSON Format')
    return
  }

  if (Array.isArray(json)) {
    json.forEach(item => {
      const nkeys = Object.keys(item)
      if (keys.length === 0) {
        keys = [...nkeys]
      } else {
        if (nkeys.length != keys.length) {
          throw new Error('Numbers of keys are different')
        } else {
          console.log('Ok')
        }
      }

      const row = keys.map( key => {
        return item[key]
      })

      values.push([...row])
    })
   

    values.unshift(keys)
    const text = values.map(value => (value.join(","))).join('\n')
    csvForm.value = text
  } else {
    alert("Is not an object array")
  }

}