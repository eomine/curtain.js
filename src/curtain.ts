export class Curtain {
  root: HTMLElement;

  private body: HTMLBodyElement;
  private bodyHeight = 0;
  private children: NodeListOf<HTMLElement>;
  private isMobile = false;
  private current?: HTMLElement|null;
  private currentPosition = 0;

  constructor(root: HTMLElement) {
    this.root = root;

    this.body = document.querySelector('body')!;
    this.children = root.querySelectorAll('> section');
    this.isMobile = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);
  }

  init() {
    this.setDimensions();
    this.children[0].classList.add('current');

    this.current = this.root.querySelector<HTMLElement>('.current');
    this.currentPosition = Number(this.current?.getAttribute('data-position'));

    if (!this.isMobile) {
      // if (this.children[1].length) {
      //   this.children[1].nextAll().style.display:'none'});
      // }
    }

    window.addEventListener('resize', () => {
      this.setDimensions();
    });

    window.addEventListener('scroll', () => {
      this.onScroll();
    });
  }

  private onScroll() {
    if (!this.current) {
      return;
    }

    const scrollTop = window.scrollY;
    const index = Number(this.current.getAttribute('data-index'));
    
    if (scrollTop < this.currentPosition && index > 0){
      this.current.classList.remove('current');
      this.current.style.marginTop = '0';

      let nextAll = this.current.nextElementSibling as HTMLElement;
      while (nextAll) {
        nextAll.style.display = '';
        nextAll = nextAll.nextElementSibling as HTMLElement;
      }

      const prev = this.current.previousElementSibling as HTMLElement;
      prev.classList.add('current');
      prev.style.display = '';

      this.current = this.root.querySelector<HTMLElement>('.current');
      this.currentPosition = Number(this.current?.getAttribute('data-position'));

      // dispatch(new Event('previous-slide'));
    } else if (scrollTop < this.currentPosition + this.current.offsetHeight) {
      const position = this.currentPosition - scrollTop;
      this.current.style.marginTop = `${position}px`;
    } else {
      this.current.classList.remove('current');
      this.current.style.display = 'none';

      const next = this.current.nextElementSibling as HTMLElement;
      next.classList.add('current');
      
      let nextAll = next.nextElementSibling as HTMLElement;
      while (nextAll) {
        nextAll.style.display = '';
        nextAll = nextAll.nextElementSibling as HTMLElement;
      }

      this.current = this.root.querySelector<HTMLElement>('.current');
      this.currentPosition = Number(this.current?.getAttribute('data-position'));

      // dispatch(new Event('next-slide'));
    }
  }

  private setDimensions() {
    const windowHeight = window.outerHeight;
    let levelHeight = 0;

    this.children.forEach((child, index) => {
      const isCover = child.classList.contains('cover');

      if (isCover) {
        child.style.height = `${windowHeight}px`;
        child.setAttribute('data-height', String(windowHeight));
        levelHeight += windowHeight;
      } else {
        const height = Math.max(child.offsetHeight, windowHeight);
        child.style.minHeight = `${height}px`;
        child.setAttribute('data-height', String(height));
        levelHeight += height;
      }

      child.style.zIndex = String(999 - index);
      child.setAttribute('data-position', String(levelHeight));
    });

    if (!this.isMobile) {
      this.setBodyHeight();
    }
  }

  private setBodyHeight() {
    let bodyHeight = 0;
    this.children.forEach(child => {
      bodyHeight += child.offsetHeight;
    });
    this.bodyHeight = bodyHeight;
    this.body.style.height = `${this.bodyHeight}px`;
  }
}
