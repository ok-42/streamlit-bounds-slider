import setuptools

setuptools.setup(
    name="streamlit-bounds-slider",
    version="0.0.1",
    author="Erdni Okunov",
    author_email="61590286+ok-42@users.noreply.github.com",
    description="Streamlit slider with three thumbs",
    packages=[
        'bounds_slider',
        'bounds_slider.frontend.build',
        'bounds_slider.frontend.build.static.js',
        'bounds_slider.frontend.build.static.css'],
    include_package_data=True,
    classifiers=[],
    python_requires=">=3.9",
    install_requires=[
        "streamlit==1.20.0",
    ],
)
