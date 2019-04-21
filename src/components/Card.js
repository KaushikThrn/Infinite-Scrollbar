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
    this.left=0;
    this.listElement.style="";
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
    this.listElement.className = `${this.listElement.className} ListItem`;
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

      if (this.left < this.listElement.offsetWidth * threshold * -1) {
        this.left = -this.listElement.offsetWidth * 2;
        //this.listElement.style.display = 'none';
        this.props.swiped();
      } else {
        this.left = 0;
        this.listElement.style.transform = `translateX(${this.left}px)`;
      }

      /* this.listElement.className = `${this.listElement.className} BouncingListItem`;
      this.listElement.style.transform = `translateX(${this.left}px)`; */
    }
  }

  onMouseMove(evt) {
    const left = evt.clientX - this.dragStartX;
    if (left < 0) {
      this.left = left;
    }
  }

  onTouchMove(evt) {
    const touch = evt.targetTouches[0];
    const left = touch.clientX - this.dragStartX;
    if (left < 0) {
      this.left = left;
    }
  }

  updatePosition() {
    if (this.dragged) requestAnimationFrame(this.updatePosition);

    const now = Date.now();
    const elapsed = now - this.startTime;

    if (this.dragged && elapsed > this.fpsInterval) {
        this.listElement.style.transform = `translateX(${this.left}px)`;

    }
  }

   
    render(){
        const {content,updated,author}=this.props.message
        return (
            <div className="card-container"  ref={div => (this.listElement = div)}
            onMouseDown={this.onDragStartMouse}
            onTouchStart={this.onDragStartTouch}>
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