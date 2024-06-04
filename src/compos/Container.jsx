export default function Container({ children, customCss='border border-primary border-3' })
{
	return <div className={ 'text-bg-danger p-2 m-2 '+ customCss } >
		<h3>container maroto</h3>
		{ children }
	</div>
}