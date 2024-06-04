import PublicMainNavigation from './PublicMainNavigation'

export default function BasePage({ children })
{
	return <>
		<PublicMainNavigation />
		{children}
	</>
}