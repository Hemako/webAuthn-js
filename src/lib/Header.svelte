<script>
  import {
    Header,
    SideNav,
    SideNavItems,
    SideNavLink,
    Content,
    DataTable,
  } from "carbon-components-svelte";
  import { BarChartSimple } from "@carbon/charts-svelte";
  import "@carbon/charts/styles.css";
  import "carbon-components-svelte/css/all.css";
  let image = "/src/assets/logoo.png";
  let isSideNavOpen = true;
  const datas = [
    { img: "", title: "Action", points: "61000" },
    { img: "", title: "Fantasy", points: "35213" },
    { img: "", title: "Documentary", points: "29123" },
    { img: "", title: "Triller", points: "51213%" },
    { img: "", title: "Comedy", points: "68000" },
  ];
  const chartData = [
    {
      group: "Action",
      value: 61000,
    },
    {
      group: "Fantasy",
      value: 35213,
    },
    {
      group: "Documentary",
      value: 29123,
    },
    {
      group: "Triller",
      value: 51213,
    },
    {
      group: "Comedy",
      value: 68000,
    },
  ];
  const headerTitle = [
    { key: "categories", value: "Categories" },
    { key: "year20", value: "Year 2020" },
    { key: "year21", value: "Year 2021" },
    { key: "year22", value: "Year 2022" },
  ];
  const rowData = [
    {
      id: "a",
      categories: "Action",
      year20: "165000 views",
      year21: "250056 views",
      year22: "336000 views",
    },
    {
      id: "b",
      categories: "Fantasy",
      year20: "160690 views",
      year21: "103600 views",
      year22: "269920 views",
    },
    {
      id: "c",
      categories: "Documentary",
      year20: "191360 views",
      year21: "191800 views",
      year22: "136000 views",
    },
    {
      id: "d",
      categories: "Triller",
      year20: "137309 views",
      year21: "246090 views",
      year22: "536070 views",
    },
    {
      id: "e",
      categories: "Comedy",
      year20: "813600 views",
      year21: "988368 views",
      year22: "103689 views",
    },
  ];
</script>

<Header persistentHamburgerMenu={true} bind:isSideNavOpen>
  <a href="/">
    <img src={image} alt="logo" class="logo" />
  </a>
</Header>
<SideNav class="sidebar-style" bind:isOpen={isSideNavOpen}>
  <SideNavItems>
    <SideNavLink href="/" text="Dashboard" />
    <!-- <SideNavLink text="Link 1" />
    <SideNavLink text="Link 2" />
    <SideNavMenu text="Menu">
      <SideNavMenuItem href="/" text="Link 1" />
      <SideNavMenuItem href="/" text="Link 2" />
      <SideNavMenuItem href="/" text="Link 3" />
    </SideNavMenu>
    <SideNavDivider /> -->
  </SideNavItems>
</SideNav>
<Content>
  <div class="dashboard-container">
    <h2>Dashboard</h2>
    <div class="card-wrapper">
      {#each datas as data (data)}
        <div class="bx--card-overview__about">
          <figure class="bx--about__icon">
            <img src={data.img} alt="" class="bx--about__icon--img" />
          </figure>
          <header class="bx--about__title">
            <p
              id="card-title-1"
              class="bx--about__title--name"
              title="Card Name"
            >
              {data.title}
            </p>
            <p
              class="bx--link bx--about__title--link"
              title="Secondary Information"
            >
              {data.points}
            </p>
          </header>
        </div>
      {/each}
    </div>
    <div class="graph-container">
      <div class="chart-wrapper">
        <BarChartSimple
          data={chartData}
          options={{
            title: "Analytics Overview",
            axes: {
              left: {
                title: "Number of views",
                mapsTo: "value",
              },
              bottom: {
                // @ts-ignore
                scaleType: "labels",
                mapsTo: "group",
              },
            },
            color: {
              pairing: {
                option: 2,
              },
              scale: {
                Action: "#f2b8ea",
                Fantasy: "#9ecaf0",
                Documentary: "#c588f7",
                Triller: "#baf7ab",
                Comedy: "#525669",
              },
            },
            height: "400px",
          }}
        />
      </div>
      <div class="table-wrapper">
        <DataTable headers={headerTitle} rows={rowData}>
          <strong slot="title">Yearly Reports</strong>
        </DataTable>
      </div>
    </div>
  </div>
</Content>

<style>
  .logo {
    width: 3rem;
    margin-left: -30px;
  }
  .search-wrapper {
    width: 200px;
  }
  .dashboard-container {
    display: flex;
    flex-direction: column;
  }
  h2 {
    text-align: left;
    font-weight: bold;
    background: -webkit-linear-gradient(#eee, rgba(57, 149, 189), #333);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .bx--card-overview__about {
    width: 13rem;
    padding: 1rem;
    box-shadow: 0px 5px 10px #f0eeeb;
  }
  .bx--about__title--name {
    font-weight: bold;
    font-size: 22px;
  }
  .card-wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 5px 30px;
    padding: 1rem 0;
  }
  .graph-container {
    margin-top: 1.2rem;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .chart-wrapper {
    width: 50%;
    padding: 1rem;
    margin-right: 1rem;
    box-shadow: 0px 20px 20px #f0eeeb;
  }
  .table-wrapper {
    width: 50%;
    margin-left: 1rem;
    padding: 2.5rem 1rem;
    box-shadow: 0px 20px 20px #f0eeeb;
  }
</style>
