import {useEffect} from 'react';
import {updateUserTrackerTime} from '../redux/actions';
import {timeFormat, TimeInterval} from '../helpers';
import {useDispatch, useSelector} from 'react-redux';
import {RootReducer} from '../redux/reducers';

export default function useTimeTracker(){
  const {isTracking, title, time} = useSelector((state: RootReducer) => state.user.timeTracker);
  const dispatch = useDispatch();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        dispatch(updateUserTrackerTime({time: time + 1}));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTracking, time]);

  useEffect(() => {
    if (isTracking) {
      document.title = `${timeFormat(time, TimeInterval.mm_ss)} | ${title}`;
    } else {
      document.title = title;
    }
  }, [isTracking, time]);
}