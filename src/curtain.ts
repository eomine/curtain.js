// interface CurtainOptions {
//   easing: string;
//   scrollSpeed: number;
// }

// const defaultOptions: CurtainOptions = {
//   easing: 'swing',
//   scrollSpeed: 400,
// };

export class Curtain {
  root: HTMLElement;
  // options: CurtainOptions;

  private body: HTMLBodyElement;
  private bodyHeight = 0;
  private children: NodeListOf<HTMLElement>;
  private isMobile = false;
  // private scrollElement: HTMLElement|null;
  private current?: HTMLElement|null;
  // private fixed?: HTMLElement|null;
  // private steps?: NodeListOf<HTMLElement>;
  private currentPosition = 0;
  // private currentHeight = 0;

  // constructor(root: HTMLElement, options: Partial<CurtainOptions>) {
  constructor(root: HTMLElement) {
    this.root = root;
    // this.options = Object.assign(defaultOptions, options) ;

    this.body = document.querySelector('body')!;
    this.children = root.querySelectorAll('> section');
    this.isMobile = !!navigator.userAgent.match(/Android|iPhone|iPad|iPod/i);
    // this.scrollElement = this.isMobile ? this.root : this.body;
  }

  init() {
    this.setDimensions();
    this.children[0].classList.add('current');

    this.current = this.root.querySelector<HTMLElement>('.current');
    // this.fixed = this.root.querySelector<HTMLElement>('.fixed');
    // this.steps = this.root.querySelectorAll<HTMLElement>('.step');
    this.currentPosition = Number(this.current?.getAttribute('data-position'));
    // this.currentHeight = Number(this.current?.getAttribute('data-height'));

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

  // private scrollToPosition(direction: string) {
  //   if (this.body?.classList.contains('animated')) {
  //     return false;
  //   }

  //   let position = null;

  //   if (direction === 'up' || direction == 'down') {
  //     const current = this.root.querySelector('.current');
  //     const next = direction === 'up'
  //       ? current?.previousElementSibling as HTMLElement
  //       : current?.nextElementSibling as HTMLElement;
  //     position = next.getAttribute('data-position');

  //     const steps = current?.querySelectorAll('.step');
  //     if (steps && steps.length > 0) {
  //       const currentStep = current?.querySelector('.current-step');
  //       if (!currentStep) {
  //         steps[0].classList.add('current-step');
  //       }
  //       const nextStep = direction === 'up'
  //         ? currentStep?.previousElementSibling as HTMLElement
  //         : currentStep?.nextElementSibling as HTMLElement;
  //       if(!!nextStep) {
  //         position = this.isMobile
  //           ? nextStep.style.top + Number(current?.getAttribute('data-position'))
  //           : nextStep.offsetTop;
  //       }
  //     }

  //     if (!!position) {
  //       // this.scrollElement.animate({ scrollTop: position }, this.options.scrollSpeed, this.options.easing);
  //     }
  //   } else if (direction === 'top') {
  //     // this.scrollElement.animate({ scrollTop: 0 }, this.options.scrollSpeed, this.options.easing);
  //   } else if (direction === 'bottom') {
  //     // this.scrollElement.animate({ scrollTop:this.bodyHeight }, this.options.scrollSpeed, this.options.easing);
  //   } else {
  //     const element = this.root.querySelector(`#${direction}`);
  //     position = Number(element?.getAttribute('data-position'));
  //     if (!!position) {
  //       // this.scrollElement.animate({ scrollTop:position }, this.options.scrollSpeed, this.options.easing);
  //     }
  //   }
  // }

  private onScroll() {
    if (!this.current) {
      return;
    }

    const scrollTop = window.scrollY;
    const windowHeight = window.outerHeight;
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
      // this.fixed = this.root.querySelector<HTMLElement>('.fixed');
      // this.steps = this.root.querySelectorAll<HTMLElement>('.step');
      this.currentPosition = Number(this.current?.getAttribute('data-position'));
      // this.currentHeight = Number(this.current?.getAttribute('data-height'));

      // dispatch(new Event('previous-slide'));
    } else if (scrollTop < this.currentPosition + this.current.offsetHeight) {
      const position = this.currentPosition - scrollTop;
      this.current.style.marginTop = `${position}px`;

      // if (this.fixed) {
      //   const dataTop = Number(this.fixed.getAttribute('data-top'));
      //   if((docTop-this.currentPosition+windowHeight) >= this.currentHeight && this.fixed.style.position === 'fixed'){
      //     const dataTop1 = Math.abs(docTop + dataTop - this.currentPosition);
      //     this.fixed.style.position = 'absolute';
      //     this.fixed.style.top = `${dataTop1}px`;
      //   } else if((docTop-this.currentPosition+windowHeight) <= this.currentHeight && this.fixed.style.position === 'absolute'){
      //     this.fixed.style.position = 'fixed';
      //     this.fixed.style.top = `${dataTop}px`;
      //   }
      // }
      // if (this.steps && this.steps.length > 0) {
      //   this.steps.forEach(step => {
      //     if (step.offsetTop <= docTop + 5 && (step.offsetTop + step.offsetHeight >= docTop + 5)) {
      //       if (!step.classList.contains('current-step')) {
      //         this.steps?.forEach(step1 => step1.classList.remove('current-step'));
      //         step.classList.add('current-step');
      //       }
      //     }
      //   });
      // }
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
      // this.fixed = this.root.querySelector<HTMLElement>('.fixed');
      // this.steps = this.root.querySelectorAll<HTMLElement>('.step');
      this.currentPosition = Number(this.current?.getAttribute('data-position'));
      // this.currentHeight = Number(this.current?.getAttribute('data-height'));

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

      // const fixed = child.querySelector<HTMLElement>('.fixed');
      // if (!!fixed) {
      //   const top = fixed.style.top;
      //   fixed.setAttribute('data-top', top);
      // }
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
