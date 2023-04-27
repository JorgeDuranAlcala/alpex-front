import html2canvas from 'html2canvas'

interface IAvatarInterface {
  name?: string
  className?: string
  bgColor?: string
  fgColor?: string
  rounded?: boolean
}

export default function AvatarInitials({
  name = '',
  className = '',
  bgColor = undefined,
  fgColor = '#fff',
  rounded = false
}: IAvatarInterface) {
  const userName = name.split(' ')

  function PrintDiv(div: HTMLElement) {
    html2canvas(div).then(function (canvas) {
      const myImage = canvas.toDataURL()
      downloadURI(myImage, 'avatar.png')
    })
  }

  function downloadURI(uri: string, name: string) {
    const link = document.createElement('a')
    link.download = name
    link.href = uri
    document.body.appendChild(link)
    link.click()
  }

  const avatarInitials = {
    display: 'table',
    height: 100,
    width: 100,
    backgroundColor: bgColor,
    color: fgColor,
    borderRadius: rounded ? '50%' : '10px'
  }

  return (
    <div
      className={className}
      id='generated_image'
      onClick={() => {
        PrintDiv(document.getElementById('generated_image')!)
      }}
      style={avatarInitials}
      title={name.toUpperCase()}
    >
      <span style={{ display: 'table-cell', verticalAlign: 'middle', textAlign: 'center' }}>
        <h1
          style={{
            margin: 0,
            padding: 0,
            fontFamily: 'Lato',
            fontWeight: `500`,
            letterSpacing: 3,
            textTransform: 'uppercase'
          }}
        >
          {`${userName.length >= 2 ? `${userName[0].charAt(0)}${userName[1].charAt(0)}` : userName[0].charAt(0)}`}
        </h1>
      </span>
    </div>
  )
}
