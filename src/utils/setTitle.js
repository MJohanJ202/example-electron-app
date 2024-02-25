// export function setTitle () {
//   const setButton = document.getElementById('btn')
//   const titleInput = document.getElementById('title')
//   setButton.addEventListener('click', () => {
//     const title = titleInput.value
//     window.electronAPI.changeNameApp(title)
//     titleInput.value = ''
//   })
// }

export const setTitle = () => {
  const $form = document.querySelector('#setTitleApp')

  $form.addEventListener('submit', event => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const title = formData.get('title')

    window.electronAPI.changeNameApp(title)
    event.target.reset()
  })
}
