


// forwardRef는 React의 고차 컴포넌트(HOC)로, 부모 컴포넌트에서 자식 컴포넌트로 ref를 전달할 때 사용됩니다. 이는 자식 컴포넌트 내부의 DOM 요소에 대한 참조를 부모 컴포넌트가 직접 접근할 수 있게 합니다.
// forwardRef는 함수형 컴포넌트에서는 ref를 직접 사용할 수 없기 때문에 forwardRef를 사용하여 부모 컴포넌트로부터 전달된 ref를 자식 컴포넌트의 특정 DOM 요소에 연결할 수 있습니다.
//
import {ForwardedRef, forwardRef, MutableRefObject, useEffect, useState} from "react";

const Cursor = forwardRef<HTMLSpanElement>((props: {}, ref: ForwardedRef<HTMLSpanElement>) => {
    const [displayState, setDisplayState] = useState('inline');

    useEffect(() => {
        const blink = setInterval(() => {
            setDisplayState((prevState) => (prevState === 'none' ? 'inline' : 'none'));
        }, 500);

        return () => clearInterval(blink);
    }, []);

    return (
        <span ref={ref as MutableRefObject<HTMLSpanElement>}
              id={'cursor'}
              style={{
                  width: '0px',
                  height: '100%',
                  position: 'relative',
                  pointerEvents: 'none' // 이벤트 패스
              }}>
            <span style={{
                display: displayState,
                position: 'absolute',
                width: '2px',
                height: '100%',
                background: 'black',
                top: 0,
                left: 0,
                transition: 'ease display 0.5'
            }} />
        </span>
    );
});
Cursor.displayName = 'Cursor';

export default Cursor;