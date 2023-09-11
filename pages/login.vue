<template>
  <body class="h-screen bg-emerald-50">
    <div class="flex flex-col justify-center items-center">
      <div
        class="bg-[url('/logo.svg')] bg-no-repeat bg-contain w-[150px] h-[98px] mt-[5%]"
      ></div>
      <div
        class="w-full bg-white rounded-lg shadow-lg md:mt-[1%] sm:max-w-md xl:p-0"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form class="flex-auto p-6 space-y-4 md:space-y-6">
            <div>
              <label class="select-none block mb-2 text-zinc-600">
                Username
              </label>
              <input
                type="text"
                class="transition duration-200 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5"
              />
            </div>
            <div>
              <label class="select-none block mb-2 text-zinc-600">
                Password
              </label>
              <input
                type="password"
                class="transition duration-200 ease-in-out bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-sky-400 focus:border-sky-400 block w-full p-2.5"
              />
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-start">
                <div class="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="remember"
                    aria-describedby="remember"
                    class="transition duration-200 ease-in-out cursor-pointer w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-sky-300"
                  />
                </div>
                <div class="ml-3 text-sm">
                  <label
                    class="cursor-pointer select-none text-zinc-600"
                    for="remember"
                    >Remember me</label
                  >
                </div>
              </div>
              <button
                type="button"
                class="transition duration-200 ease-in-out px-5 py-2 bg-sky-500 hover:bg-sky-700 rounded-md text-white select-none"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </body>
</template>
