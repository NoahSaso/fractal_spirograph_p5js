function Orbit(x, y, r, n, p) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.n = n;
  this.parent = p;
  this.child = null;
  this.speed = radians(pow(k, this.n - 1)) / resolution;
  this.angle = -PI/2;

  this.addChild = function () {
    let newR = this.r / 3.0;
    let newX = this.x;
    let newY = this.y + (this.r + newR);
    this.child = new Orbit(newX, newY, newR, this.n + 1, this);
    return this.child;
  }

  this.update = function () {
    // Once first rotation orbit (n=1) completes the circle starting from -PI/2, stop updating
    if (this.n == 1 && this.angle >= 3 * PI / 2) {
      return;
    }
    if (this.n > 0) {
      this.angle += this.speed;
      let rSum = this.r + (inside ? -1 : 1) * this.parent.r;
      this.x = this.parent.x + (inside ? -1 : 1) * rSum * cos(this.angle);
      this.y = this.parent.y + (inside ? -1 : 1) * rSum * sin(this.angle);
    }
    if (this.child != null) {
      this.child.update();
    }
  }

  this.show = function () {
    stroke(255, 100);
    strokeWeight(1);
    noFill();
    ellipse(this.x, this.y, this.r * 2, this.r * 2);
    if (this.child != null) {
      this.child.show();
    }
  }
}