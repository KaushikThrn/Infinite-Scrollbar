import React, {Component} from 'react';


class Card extends Component {

  listElement;
  wrapper;
  background;

  // Drag & Drop
  dragStartX = 0;
  left = 0;
  dragged = false;

  // FPS Limit
  startTime;
  fpsInterval = 1000 / 60;

  constructor(props) {
    super(props);

    this.listElement = null;
    this.wrapper = null;
    this.background = null;

    this.onMouseMove = this.onMouseMove.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onDragStartMouse = this.onDragStartMouse.bind(this);
    this.onDragStartTouch = this.onDragStartTouch.bind(this);
    this.onDragEndMouse = this.onDragEndMouse.bind(this);
    this.onDragEndTouch = this.onDragEndTouch.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.updatePosition = this.updatePosition.bind(this);
  }

  componentDidMount() {
    window.addEventListener("mouseup", this.onDragEndMouse);
    window.addEventListener("touchend", this.onDragEndTouch);
  }

  componentDidUpdate() {
    this.right=0;
    this.listElement.style = ``;
    this.listElement.className = `card-container`;
  }

  componentWillUnmount() {
    window.removeEventListener("mouseup", this.onDragEndMouse);
    window.removeEventListener("touchend", this.onDragEndTouch);
  }

  onDragStartMouse(evt) {
    this.onDragStart(evt.clientX);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  onDragStartTouch(evt) {
    const touch = evt.targetTouches[0];
    this.onDragStart(touch.clientX);
    window.addEventListener("touchmove", this.onTouchMove);
  }

  onDragStart(clientX) {
    this.dragged = true;
    this.dragStartX = clientX;
    this.startTime = Date.now();
    requestAnimationFrame(this.updatePosition);
  }

  onDragEndMouse(evt) {
    window.removeEventListener("mousemove", this.onMouseMove);
    this.onDragEnd();
  }

  onDragEndTouch(evt) {
    window.removeEventListener("touchmove", this.onTouchMove);
    this.onDragEnd();
  }

  onDragEnd() {
    if (this.dragged) {
      this.dragged = false;

      const threshold = 0.3;

      if (this.right > this.listElement.offsetWidth * threshold ) {
        this.right = this.listElement.offsetWidth * 2;
        //this.listElement.style.maxHeight = 0;
        this.listElement.className = `${this.listElement.className}`;
        this.props.swiped();
      } else {
        this.right = 0;
        this.listElement.className = `${this.listElement.className}`;
        this.listElement.style.transform = `translateX(${this.right}px)`;
      }
    }
  }

  onMouseMove(evt) {
    const right = evt.clientX - this.dragStartX;
    if (right > 0) {
      this.right = right;
    }
  }

  onTouchMove(evt) {
    const touch = evt.targetTouches[0];
    const right = touch.clientX - this.dragStartX;
    if (right > 0) {
      this.right = right;
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed > this.fpsInterval) {
        this.listElement.style.transform = `translateX(${this.right}px)`;

    }
  }

   
    render(){
        const {content,updated,author}=this.props.message
        return (
            <div className="card-container"  ref={div => (this.listElement = div)}
            onMouseDown={this.onDragStartMouse}
            onTouchStart={this.onDragStartTouch}
            onClick={this.props.swiped}
            >
            <div className="author-container">
                <div className="image-container">
                    <img src={`http://message-list.appspot.com/${author.photoUrl}`} alt="thumbnail" className="author-image" />
                </div>
                <div className="author-details">
                    <span className="author-details__name">{author.name}</span>
                    <span className="author-details__updated">{updated}</span>
                </div>
            </div>
            <div className="message-content">{content}</div>
        </div> 
        )
    }

}

export default Card;