import { View, Pressable, Text } from 'react-native';

interface TodoDetailSaveBtnProps {
  onPress: () => void;
}

const TodoDetailSaveBtn: React.FC<TodoDetailSaveBtnProps> = ({ onPress }) => {
  return (
    <View className="absolute w-full bottom-0 px-5 py-4 bg-white">
      <Pressable
        onPress={onPress}
        className="w-full flex-1 bg-blue-400 rounded-md py-4 px-4 items-center">
        <Text className="text-white font-bold">Save</Text>
      </Pressable>
    </View>
  );
};

export default TodoDetailSaveBtn;
