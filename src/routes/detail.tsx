import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated from 'react-native-reanimated';

import type { RootStackParamList } from '../../types';

type Props = NativeStackScreenProps<RootStackParamList, 'DetailScreen'>;

const Detail: React.FC<Props> = ({ route }) => {
  const { params } = route;

  return (
    <Animated.View
      sharedTransitionTag={`containerTag-${params.index}`}
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: params.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Animated.Text
        sharedTransitionTag={`titleTag-${params.index}`}
        style={{ color: '#fff', fontSize: 24 }}>
        {params.title}
      </Animated.Text>
    </Animated.View>
  );
};

export default Detail;
