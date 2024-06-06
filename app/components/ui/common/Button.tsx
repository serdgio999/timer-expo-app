import { FC, PropsWithChildren } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';
import cn from 'clsx';

interface Props extends PressableProps {
	className?: string;
}

const Button: FC<PropsWithChildren<Props>> = ({
	children,
	className,
	...rest
}) => {
	return (
		<Pressable
			className={cn('self-center mt-4 bg-primary py-3 px-8 rounded', className)}
			{...rest}
		>
			<Text className='font-semibold text-white text-xl'>{children}</Text>
		</Pressable>
	);
};

export default Button;
