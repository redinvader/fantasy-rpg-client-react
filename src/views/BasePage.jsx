import PublicMainNavigation from './PublicMainNavigation'
import { RouterLoadingCompo } from '@/router'

export default function BasePage({ children })
{
	return <>
		<RouterLoadingCompo>
			<PublicMainNavigation />
			{children}
		</RouterLoadingCompo>
	</>
}