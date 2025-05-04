import { TouchableOpacity, View } from 'react-native'
import { styles } from './styles'
import { LeftArrowIcon, RightArrowIcon } from '../../../shared/Icons/Icons'
import colors from '../../../../constants/colors'

interface CarouselNavigationProps {
  onPrev: () => void
  onNext: () => void
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrev,
  onNext,
}) => {
  return (
    <View style={styles.navigationContainer}>
      <TouchableOpacity onPress={onPrev}>
        <LeftArrowIcon color={colors.solidWhite} size={48} />
      </TouchableOpacity>

      <TouchableOpacity onPress={onNext}>
        <RightArrowIcon color={colors.solidWhite} size={48} />
      </TouchableOpacity>
    </View>
  )
}

export default CarouselNavigation
