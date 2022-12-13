import * as React from 'react'

const clickOutside = (WrappedComponent: any) => {
  return class ClickOutsite extends React.Component<any, any> {
    ref: React.RefObject<HTMLDivElement>
    constructor(props: any) {
      super(props)
      this.state = { outsideClick: false }
      this.ref = React.createRef()
      this.handleClick = this.handleClick.bind(this)
    }

    handleClick(e: any) {
      e.preventDefault()

      if (this.ref.current && !this.ref.current.contains(e.target)) {
        this.setState({ outsideClick: true })
      } else {
        this.setState({ outsideClick: false })
      }
    }

    componentDidMount() {
      window.addEventListener('click', this.handleClick)
    }

    componentWillUnmount() {
      window.removeEventListener('click', this.handleClick)
    }

    render(): React.ReactNode {
      return (
        <div ref={this.ref} className={this.props.HOCClassName || ''}>
          <WrappedComponent
            {...this.props}
            outsiteClick={this.state.outsideClick}
          />
        </div>
      )
    }
  }
}

export default clickOutside
