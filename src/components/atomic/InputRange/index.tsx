import { ChangeEvent, useCallback, useEffect, useState, useRef, forwardRef, useImperativeHandle, Ref } from 'react';
import Styles from './InputRange.module.scss';
import classNames from 'classnames';

type Props = {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}
type MultiRangeSliderHandle = {
  handleReset: () => void;
};
const MultiRangeSlider = forwardRef<MultiRangeSliderHandle, Props>((props, ref: Ref<MultiRangeSliderHandle>) => {
  const { min, max, onChange } = props;
  
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(min);
  const maxValRef = useRef(max);
  const range = useRef<HTMLDivElement>(null); 

  const getPercent = useCallback((value: number) =>
    Math.round(((value - min) / (max - min)) * 100), [min, max])

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent, min, max]);  

  const handleReset = useCallback(()=> {
    setMinVal(min);
    setMaxVal(max);
    minValRef.current = min;
    maxValRef.current = max;
    onChange(min, max);
  }, [max, min, onChange]);
  

  useImperativeHandle(ref, () => ({
    handleReset,
  }), [handleReset]);
  

  const formatPrice = (price: number) => price.toLocaleString('en-US');


  return (
    <div className={Styles.wrapper} ref={ref as unknown as React.RefObject<HTMLDivElement>}>
      <div className={Styles.container}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const value = Math.min(Number(event.target.value), maxVal - 1);
            setMinVal(value);
            minValRef.current = value;            
            onChange(value, maxVal);
          }}
          className={classNames(Styles.thumb, Styles.thumbLeft)}
          style={{ zIndex: minVal > max - 100 ? "5" : "10" }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {  
            const value = Math.max(Number(event.target.value), minVal + 1);
            setMaxVal(value);
            maxValRef.current = value;
            onChange(minVal, value);
          }}
          className={classNames(Styles.thumb,Styles.thumbRight)}
        />

        <div className={Styles.slider}>
          <div className={Styles.sliderTrack}></div>
          <div ref={range} className={Styles.sliderRange}></div>
          <div className={Styles.sliderLeftValue}>{`از ${formatPrice(minVal)} تومان`}</div>
          <div className={Styles.sliderRightValue}>{`تا ${formatPrice(maxVal)} تومان`}</div>
        </div>
      </div>
    </div>
  )
});

export default MultiRangeSlider;
