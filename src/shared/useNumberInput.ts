import IMask, { InputMask } from 'imask';

interface IPriceInputParams {
  value?: string | number;
  mask: string;
  decimal?: number;
  min?: number;
  max?: number;
  onChange: (n: number) => void;
  setValue?: (n: number) => void;
}

export function numberInput(node: HTMLInputElement, params: IPriceInputParams) {
  let mask: InputMask;

  // params.setValue

  function update(params: IPriceInputParams) {
    mask = IMask(node, {
      mask: params.mask,
      lazy: false,
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ' ',
          radix: '.',
          scale: params.decimal ?? 0,
          padFractionalZeros: true,
          lazy: false,
          min: params.min,
          max: params.max,
        },
      },
    });

    mask.updateValue();

    node.addEventListener('input', (e) => {
      const parsed = parseFloat(mask.unmaskedValue);
      if (!isNaN(parsed)) {
        params.onChange(parsed);
      }
    });
  }

  function destroy() {
    mask.destroy();
  }

  update(params);

  return {
    update,
    destroy,
  };
}
